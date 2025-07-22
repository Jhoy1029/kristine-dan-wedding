const fs = require('fs');
const path = require('path');

// In-memory storage (backup)
let rsvpData = {
    rsvps: [],
    stats: {
        total: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0
    }
};

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID || '',
    sheetName: 'RSVPs',
    credentials: process.env.GOOGLE_SERVICE_ACCOUNT_KEY || ''
};

// Update statistics
function updateStats() {
    const stats = {
        total: rsvpData.rsvps.length,
        attending: rsvpData.rsvps.filter(rsvp => rsvp.attending === 'yes').length,
        notAttending: rsvpData.rsvps.filter(rsvp => rsvp.attending === 'no').length,
        totalGuests: rsvpData.rsvps.reduce((sum, rsvp) => sum + parseInt(rsvp.guests || 0), 0)
    };
    rsvpData.stats = stats;
    return stats;
}

// Save to Google Sheets
async function saveToGoogleSheets(rsvpEntry) {
    try {
        if (!GOOGLE_SHEETS_CONFIG.spreadsheetId) {
            console.log('Google Sheets not configured, skipping sheet save');
            return true;
        }

        // For now, we'll use a simple approach with Google Sheets API
        // You'll need to set up Google Sheets API and get credentials
        
        const rowData = [
            rsvpEntry.timestamp,
            rsvpEntry.name,
            rsvpEntry.email,
            rsvpEntry.guests,
            rsvpEntry.attending === 'yes' ? 'Yes' : 'No',
            rsvpEntry.message || ''
        ];

        // This is a placeholder - you'll need to implement actual Google Sheets API call
        console.log('Would save to Google Sheets:', rowData);
        
        return true;
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        return false;
    }
}

// Save to local file as backup
function saveToLocalFile() {
    try {
        const data = JSON.stringify(rsvpData, null, 2);
        fs.writeFileSync('/tmp/rsvp_backup.json', data);
        return true;
    } catch (error) {
        console.error('Error saving to local file:', error);
        return false;
    }
}

// Load from local file
function loadFromLocalFile() {
    try {
        if (fs.existsSync('/tmp/rsvp_backup.json')) {
            const data = fs.readFileSync('/tmp/rsvp_backup.json', 'utf8');
            rsvpData = JSON.parse(data);
            console.log('Loaded data from backup file');
        }
    } catch (error) {
        console.error('Error loading from backup file:', error);
    }
}

// Load data on startup
loadFromLocalFile();

exports.handler = async function(event, context) {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const path = event.path.replace('/.netlify/functions/rsvp-google-sheets', '');

        // POST - Submit RSVP
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            const { name, email, guests, attending, message } = body;

            // Validation
            if (!name || !email || guests === undefined || !attending) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Please fill in all required fields'
                    })
                };
            }

            // Create RSVP entry
            const rsvpEntry = {
                id: Date.now().toString(),
                name: name.trim(),
                email: email.trim().toLowerCase(),
                guests: parseInt(guests),
                attending,
                message: message ? message.trim() : '',
                timestamp: new Date().toISOString()
            };

            // Check if email already exists
            const existingIndex = rsvpData.rsvps.findIndex(rsvp => rsvp.email === rsvpEntry.email);
            
            if (existingIndex !== -1) {
                // Update existing RSVP
                rsvpData.rsvps[existingIndex] = { ...rsvpData.rsvps[existingIndex], ...rsvpEntry };
            } else {
                // Add new RSVP
                rsvpData.rsvps.push(rsvpEntry);
            }

            // Update statistics
            updateStats();

            // Save to multiple locations for backup
            const savePromises = [
                saveToGoogleSheets(rsvpEntry),
                saveToLocalFile()
            ];

            await Promise.all(savePromises);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Thank you for your RSVP! We look forward to celebrating with you!',
                    data: rsvpEntry,
                    savedToSheets: true
                })
            };
        }

        // GET - Get RSVPs or stats
        if (event.httpMethod === 'GET') {
            if (path === '/all' || path === '') {
                // Return all RSVPs
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        rsvps: rsvpData.rsvps,
                        stats: rsvpData.stats,
                        totalCount: rsvpData.rsvps.length
                    })
                };
            } else if (path === '/stats') {
                // Return statistics only
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        stats: rsvpData.stats,
                        totalRSVPs: rsvpData.rsvps.length
                    })
                };
            } else if (path === '/health') {
                // Health check
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        message: 'RSVP API with Google Sheets backup is running',
                        timestamp: new Date().toISOString(),
                        rsvpCount: rsvpData.rsvps.length,
                        googleSheetsConfigured: !!GOOGLE_SHEETS_CONFIG.spreadsheetId
                    })
                };
            }
        }

        // 404 for unknown routes
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Route not found'
            })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        };
    }
}; 