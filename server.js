const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Database file path
const RSVP_FILE = 'rsvp_data.json';

// Initialize RSVP data file if it doesn't exist
function initializeRSVPFile() {
    if (!fs.existsSync(RSVP_FILE)) {
        fs.writeFileSync(RSVP_FILE, JSON.stringify({
            rsvps: [],
            stats: {
                total: 0,
                attending: 0,
                notAttending: 0,
                totalGuests: 0
            }
        }, null, 2));
    }
}

// Read RSVP data
function readRSVPData() {
    try {
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

// Email configuration (you'll need to set up your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
    try {
        const { name, email, guests, attending, message } = req.body;

        // Validation
        if (!name || !email || !guests || !attending) {
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
            ip: req.ip
        };

        // Read current data
        const rsvpData = readRSVPData();

        // Check if email already exists
        const existingRSVP = rsvpData.rsvps.find(rsvp => rsvp.email === rsvpEntry.email);
        if (existingRSVP) {
            // Update existing RSVP
            const index = rsvpData.rsvps.findIndex(rsvp => rsvp.email === rsvpEntry.email);
            rsvpData.rsvps[index] = { ...existingRSVP, ...rsvpEntry };
        } else {
            // Add new RSVP
            rsvpData.rsvps.push(rsvpEntry);
        }

        // Update statistics
        const updatedData = updateStats(rsvpData);

        // Save to file
        if (!writeRSVPData(updatedData)) {
            return res.status(500).json({
                success: false,
                message: 'Error saving RSVP data'
            });
        }

        // Send confirmation email (optional)
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER || 'your-email@gmail.com',
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
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the RSVP if email fails
        }

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

// Get RSVP statistics (for admin dashboard)
app.get('/api/rsvp/stats', (req, res) => {
    try {
        const rsvpData = readRSVPData();
        res.json({
            success: true,
            stats: rsvpData.stats,
            totalRSVPs: rsvpData.rsvps.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving RSVP statistics'
        });
    }
});

// Get all RSVPs (for admin dashboard)
app.get('/api/rsvp/all', (req, res) => {
    try {
        const rsvpData = readRSVPData();
        res.json({
            success: true,
            rsvps: rsvpData.rsvps,
            stats: rsvpData.stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving RSVP data'
        });
    }
});

// Initialize the server
initializeRSVPFile();

app.listen(PORT, () => {
    console.log(`🚀 Wedding RSVP Server running on port ${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled (set EMAIL_USER and EMAIL_PASS)'}`);
    console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin.html`);
}); 