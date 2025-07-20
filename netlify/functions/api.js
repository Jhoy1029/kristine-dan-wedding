const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database file path (using environment variable for Netlify)
const RSVP_FILE = process.env.RSVP_FILE || '/tmp/rsvp_data.json';

// Initialize RSVP data file if it doesn't exist
function initializeRSVPFile() {
    try {
        if (!fs.existsSync(RSVP_FILE)) {
            const initialData = {
                rsvps: [],
                stats: {
                    total: 0,
                    attending: 0,
                    notAttending: 0,
                    totalGuests: 0
                }
            };
            fs.writeFileSync(RSVP_FILE, JSON.stringify(initialData, null, 2));
            console.log('RSVP file initialized at:', RSVP_FILE);
        }
    } catch (error) {
        console.error('Error initializing RSVP file:', error);
    }
}

// Read RSVP data
function readRSVPData() {
    try {
        if (!fs.existsSync(RSVP_FILE)) {
            initializeRSVPFile();
        }
        const data = fs.readFileSync(RSVP_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading RSVP data:', error);
        return { rsvps: [], stats: { total: 0, attending: 0, notAttending: 0, totalGuests: 0 } };
    }
}

// Write RSVP data
function writeRSVPData(data) {
    try {
        fs.writeFileSync(RSVP_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing RSVP data:', error);
        return false;
    }
}

// Update statistics
function updateStats(rsvpData) {
    const stats = {
        total: rsvpData.rsvps.length,
        attending: rsvpData.rsvps.filter(rsvp => rsvp.attending === 'yes').length,
        notAttending: rsvpData.rsvps.filter(rsvp => rsvp.attending === 'no').length,
        totalGuests: rsvpData.rsvps.reduce((sum, rsvp) => sum + parseInt(rsvp.guests || 0), 0)
    };
    rsvpData.stats = stats;
    return rsvpData;
}

// Email configuration (optional)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// Initialize the database
initializeRSVPFile();

// API Routes
app.post('/rsvp', async (req, res) => {
    console.log('RSVP POST request received:', req.body);
    
    try {
        const { name, email, guests, attending, message } = req.body;

        // Validation
        if (!name || !email || !guests || !attending) {
            console.log('Validation failed - missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Create RSVP entry
        const rsvpEntry = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            guests: parseInt(guests),
            attending,
            message: message ? message.trim() : '',
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        };

        // Read current data
        const rsvpData = readRSVPData();

        // Check if email already exists
        const existingRSVP = rsvpData.rsvps.find(rsvp => rsvp.email === rsvpEntry.email);
        if (existingRSVP) {
            // Update existing RSVP
            const index = rsvpData.rsvps.findIndex(rsvp => rsvp.email === rsvpEntry.email);
            rsvpData.rsvps[index] = { ...existingRSVP, ...rsvpEntry };
            console.log('Updated existing RSVP for:', email);
        } else {
            // Add new RSVP
            rsvpData.rsvps.push(rsvpEntry);
            console.log('Added new RSVP for:', email);
        }

        // Update statistics
        const updatedData = updateStats(rsvpData);

        // Save to file
        if (!writeRSVPData(updatedData)) {
            console.error('Failed to save RSVP data');
            return res.status(500).json({
                success: false,
                message: 'Error saving RSVP data'
            });
        }

        // Send confirmation email (optional)
        if (transporter) {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: rsvpEntry.email,
                    subject: 'RSVP Confirmation - Edannoir & Kristine Wedding',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #734214;">Thank you for your RSVP!</h2>
                            <p>Dear ${rsvpEntry.name},</p>
                            <p>We have received your RSVP for our wedding celebration.</p>
                            <div style="background: #f5f5de; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #734214; margin-top: 0;">Your RSVP Details:</h3>
                                <p><strong>Name:</strong> ${rsvpEntry.name}</p>
                                <p><strong>Number of Additional Guests:</strong> ${rsvpEntry.guests}</p>
                                <p><strong>Attending:</strong> ${rsvpEntry.attending === 'yes' ? 'Yes, I will attend' : 'No, I cannot attend'}</p>
                                ${rsvpEntry.message ? `<p><strong>Message:</strong> ${rsvpEntry.message}</p>` : ''}
                            </div>
                            <p>We look forward to celebrating with you!</p>
                            <p>Best regards,<br>Edannoir & Kristine</p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('Confirmation email sent to:', email);
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
            }
        }

        console.log('RSVP processed successfully for:', email);
        res.json({
            success: true,
            message: 'Thank you for your RSVP! We look forward to celebrating with you!',
            data: rsvpEntry
        });

    } catch (error) {
        console.error('RSVP submission error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your RSVP'
        });
    }
});

// Get RSVP statistics
app.get('/rsvp/stats', (req, res) => {
    console.log('Stats GET request received');
    try {
        const rsvpData = readRSVPData();
        console.log('Stats retrieved successfully:', rsvpData.stats);
        res.json({
            success: true,
            stats: rsvpData.stats,
            totalRSVPs: rsvpData.rsvps.length
        });
    } catch (error) {
        console.error('Error retrieving stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving RSVP statistics'
        });
    }
});

// Get all RSVPs
app.get('/rsvp/all', (req, res) => {
    console.log('All RSVPs GET request received');
    try {
        const rsvpData = readRSVPData();
        console.log('All RSVPs retrieved successfully, count:', rsvpData.rsvps.length);
        res.json({
            success: true,
            rsvps: rsvpData.rsvps,
            stats: rsvpData.stats
        });
    } catch (error) {
        console.error('Error retrieving all RSVPs:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving RSVP data'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    console.log('Health check request received');
    res.json({ 
        status: 'OK', 
        message: 'Wedding RSVP API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.url);
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

module.exports.handler = serverless(app); 