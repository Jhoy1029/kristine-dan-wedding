# Troubleshooting Netlify Function 404 Error

## Issue
Your admin page is showing "Error connecting to server: HTTP error! status: 404" after deploying to Netlify.

## Possible Causes and Solutions

### 1. Function Not Deployed
**Check if the function is deployed:**
- Go to your Netlify dashboard
- Navigate to Functions tab
- Check if `api` function is listed
- If not, redeploy your site

### 2. Function Path Issues
**Test the function directly:**
- Visit: `https://your-site.netlify.app/.netlify/functions/api/health`
- If this returns 404, the function isn't working

### 3. Dependencies Missing
**Ensure all dependencies are installed:**
```bash
npm install
```

### 4. Function Configuration
**Check netlify.toml:**
- Make sure functions directory is correct
- Ensure node version is set to 18

### 5. File System Issues
**The function now uses in-memory storage as fallback:**
- If file system fails, data will be stored in memory
- This is temporary and will reset on function restart

## Testing Steps

### Step 1: Test Basic Function
1. Visit `admin-test.html` on your deployed site
2. Click "Test Health Endpoint"
3. Check if it returns success

### Step 2: Check Function Logs
1. Go to Netlify dashboard
2. Navigate to Functions tab
3. Click on the `api` function
4. Check the logs for errors

### Step 3: Test API Endpoints
Use the test page to verify:
- Health endpoint: `/.netlify/functions/api/health`
- Get RSVPs: `/.netlify/functions/api/rsvp/all`
- Add RSVP: `/.netlify/functions/api/rsvp` (POST)

## Quick Fixes

### Option 1: Redeploy
1. Make a small change to any file
2. Commit and push to trigger redeploy
3. Wait for deployment to complete

### Option 2: Check Function Code
1. Ensure `netlify/functions/api.js` exists
2. Verify the export is correct:
```javascript
exports.handler = async function(event, context) {
    // ... function code
};
```

### Option 3: Use Test Function
1. Visit `admin-test.html` to test basic functionality
2. If test function works, the issue is with the main API
3. If test function fails, there's a deployment issue

## Environment Variables (Optional)
If you want email notifications, set these in Netlify:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password

## Contact Support
If none of the above works:
1. Check Netlify function logs
2. Verify your site URL is correct
3. Ensure you're using the right function path

## Expected Behavior
After fixing:
- Admin page should load RSVP data
- Health endpoint should return status OK
- Adding RSVPs should work
- Data should persist (in memory or file) 