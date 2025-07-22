exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Check environment variables
        const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;
        
        if (!googleSheetsUrl) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Google Sheets URL not configured',
                    instructions: [
                        '1. Go to Netlify dashboard',
                        '2. Site settings > Environment variables',
                        '3. Add GOOGLE_SHEETS_URL with your Google Apps Script URL',
                        '4. Redeploy your site'
                    ]
                })
            };
        }

        // Test Google Sheets connection
        try {
            const testData = {
                timestamp: new Date().toISOString(),
                name: 'Test User',
                email: 'test@example.com',
                guests: 1,
                attending: 'yes',
                message: 'Test from Netlify function'
            };

            const response = await fetch(googleSheetsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });

            if (response.ok) {
                const result = await response.json();
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        message: 'Google Sheets integration working!',
                        testData: testData,
                        sheetsResponse: result,
                        googleSheetsUrl: googleSheetsUrl.substring(0, 50) + '...'
                    })
                };
            } else {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Google Sheets connection failed',
                        status: response.status,
                        statusText: response.statusText,
                        googleSheetsUrl: googleSheetsUrl.substring(0, 50) + '...'
                    })
                };
            }
        } catch (fetchError) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Error connecting to Google Sheets',
                    error: fetchError.message,
                    googleSheetsUrl: googleSheetsUrl.substring(0, 50) + '...'
                })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Function error',
                error: error.message
            })
        };
    }
}; 