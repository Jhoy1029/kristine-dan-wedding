# Google Sheets Integration Setup

## Option 1: Google Apps Script (Recommended - Easiest)

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVPs"
4. Add these headers in row 1:
   ```
   Timestamp | Name | Email | Additional Guests | Attending | Message
   ```

### Step 2: Set up Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the code with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare row data
    const rowData = [
      new Date(data.timestamp),
      data.name,
      data.email,
      data.guests,
      data.attending === 'yes' ? 'Yes' : 'No',
      data.message || ''
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP saved to Google Sheets'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving RSVP: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Sheets API is working'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3: Deploy the Script
1. Click **Deploy > New deployment**
2. Choose **Web app**
3. Set **Execute as**: "Me"
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. Copy the **Web app URL** (you'll need this)

### Step 4: Update Your Netlify Function
Replace your current `rsvp.js` with this updated version that sends to Google Sheets:

```javascript
// Add this function to your rsvp.js
async function saveToGoogleSheets(rsvpEntry) {
  try {
    const webAppUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Replace with your URL
    
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpEntry)
    });
    
    if (response.ok) {
      console.log('Saved to Google Sheets successfully');
      return true;
    } else {
      console.error('Failed to save to Google Sheets');
      return false;
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
}
```

## Option 2: Google Sheets API (Advanced)

### Step 1: Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create service account credentials
5. Download the JSON key file

### Step 2: Set Environment Variables
In your Netlify dashboard:
1. Go to **Site settings > Environment variables**
2. Add:
   - `GOOGLE_SHEET_ID`: Your spreadsheet ID
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: Your service account JSON

### Step 3: Install Dependencies
Add to your `package.json`:
```json
{
  "dependencies": {
    "googleapis": "^128.0.0"
  }
}
```

## Quick Setup (Recommended)

### 1. Create Google Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new spreadsheet
- Add headers: `Timestamp | Name | Email | Guests | Attending | Message`

### 2. Get Web App URL
- Use the Google Apps Script method above
- Copy the deployment URL

### 3. Update Function
I'll create an updated function that uses your Google Sheets URL.

## Benefits of Google Sheets Backup

✅ **Never lose data** - RSVPs saved permanently  
✅ **Easy to view** - Open Google Sheets anytime  
✅ **Export options** - Download as Excel/CSV  
✅ **Share access** - Give others view/edit access  
✅ **Real-time updates** - See new RSVPs instantly  
✅ **Free** - No additional costs  

## Testing

After setup, test by:
1. Submitting an RSVP on your website
2. Checking your Google Sheet for the new row
3. Verifying all data is correct

Would you like me to help you set up the Google Apps Script version? It's the easiest and most reliable method! 