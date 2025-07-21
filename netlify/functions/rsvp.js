const fs = require('fs');
const path = require('path');

// In-memory storage (will reset on function restart, but works for testing)
let rsvpData = {
    rsvps: [],
    stats: {
        total: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0
    }
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
        const path = event.path.replace('/.netlify/functions/rsvp', '');

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

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Thank you for your RSVP! We look forward to celebrating with you!',
                    data: rsvpEntry
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
                        stats: rsvpData.stats
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
                        message: 'RSVP API is running',
                        timestamp: new Date().toISOString(),
                        rsvpCount: rsvpData.rsvps.length
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