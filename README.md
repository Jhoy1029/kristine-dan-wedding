# Edannoir & Kristine Wedding Website

A beautiful, responsive wedding invitation website with RSVP functionality.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Timeline**: Our love story with animated timeline
- **Wedding Details**: Ceremony and reception schedules
- **Photo Gallery**: Lightbox gallery with navigation
- **RSVP System**: Complete RSVP functionality with backend
- **Admin Dashboard**: View and manage RSVP submissions
- **Email Notifications**: Automatic confirmation emails
- **Countdown Timer**: Real-time countdown to the wedding day

## RSVP Functionality

The website includes a complete RSVP system with:

- **Form Validation**: Required fields and data validation
- **Backend Storage**: JSON file-based database
- **Email Confirmations**: Automatic email notifications
- **Admin Dashboard**: View submissions and statistics
- **CSV Export**: Export RSVP data for analysis
- **Real-time Updates**: Live statistics and data refresh

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email (Optional)

To enable email notifications, set up your email credentials:

```bash
# For Gmail (recommended)
export EMAIL_USER="your-email@gmail.com"
export EMAIL_PASS="your-app-password"

# For other email providers, modify the transporter configuration in server.js
```

**Note**: For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password instead of your regular password

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 4. Access Points

- **Wedding Website**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin.html`

## File Structure

```
├── index.html          # Main wedding website
├── admin.html          # Admin dashboard
├── server.js           # Express server
├── script.js           # Frontend JavaScript
├── styles.css          # CSS styles
├── package.json        # Dependencies
├── rsvp_data.json      # RSVP database (auto-generated)
└── Assests/            # Images and media files
```

## Admin Dashboard Features

- **Real-time Statistics**: Total RSVPs, attending/not attending counts
- **RSVP Management**: View all submissions in a table format
- **Filtering**: Filter by attendance status
- **CSV Export**: Download RSVP data for analysis
- **Auto-refresh**: Data updates every 30 seconds

## API Endpoints

- `POST /api/rsvp` - Submit RSVP
- `GET /api/rsvp/stats` - Get RSVP statistics
- `GET /api/rsvp/all` - Get all RSVP data

## Customization

### Colors and Styling
The website uses a warm autumn color palette:
- Primary Brown: `#734214`
- Soft Beige: `#f4e8d1`
- Burnt Orange: `#c25d2e`
- Pale Cream: `#f5f5de`

### Wedding Details
Update the following in `index.html`:
- Wedding date and time
- Venue information
- Timeline events
- Social media links

### Images
Replace images in the `Assests/` folder:
- `intro.jpg` - Hero background
- `1.jpg` to `8.jpg` - Gallery images
- `bg.jpg` - Background images

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set up environment variables
2. Run `npm start`
3. Use a process manager like PM2 for production

### Hosting Options
- **Heroku**: Easy deployment with Git
- **Vercel**: Great for static sites
- **Netlify**: Excellent for frontend hosting
- **DigitalOcean**: Full control over server

## Security Notes

- The admin dashboard has no authentication (add if needed)
- Email credentials should be kept secure
- Consider adding rate limiting for RSVP submissions
- Backup the `rsvp_data.json` file regularly

## Support

For questions or issues, please contact the development team.

---

**Made with ❤️ for Edannoir & Kristine's special day** 