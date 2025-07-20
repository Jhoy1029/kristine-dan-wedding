# 🎊 Wedding Website Deployment Guide

## 🚀 **Quick Deploy to Netlify (Recommended)**

### **Step 1: Create a GitHub Repository**

1. **Go to GitHub.com** and create a new repository
2. **Name it**: `wedding-website` or `kristine-dan-wedding`
3. **Make it public** (free hosting)
4. **Upload your files**:
   - Drag and drop all your files to the repository
   - Or use GitHub Desktop to upload

### **Step 2: Deploy to Netlify**

1. **Go to [Netlify.com](https://netlify.com)**
2. **Click "Sign up"** (free account)
3. **Click "New site from Git"**
4. **Choose GitHub** and authorize
5. **Select your repository**
6. **Click "Deploy site"**

### **Step 3: Configure Environment Variables (Optional)**

If you want email notifications:

1. **Go to Site Settings** → **Environment Variables**
2. **Add these variables**:
   - `EMAIL_USER` = your-gmail@gmail.com
   - `EMAIL_PASS` = your-app-password

### **Step 4: Get Your URLs**

- **Wedding Website**: `https://your-site-name.netlify.app`
- **Admin Dashboard**: `https://your-site-name.netlify.app/admin.html`

---

## 📧 **Email Setup (Optional)**

### **For Gmail:**

1. **Enable 2-Factor Authentication** on your Gmail
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use the app password** in Netlify environment variables

---

## 🔧 **Alternative Deployment Options**

### **Option 2: Vercel**
- Similar to Netlify
- Great for React/Next.js projects
- Free hosting

### **Option 3: GitHub Pages**
- Free hosting
- Requires manual setup
- Limited serverless functions

### **Option 4: Traditional Hosting**
- Shared hosting (HostGator, Bluehost)
- VPS hosting (DigitalOcean, Linode)
- More control but requires server management

---

## 📱 **Sharing with Your Client**

### **What to Send Them:**

1. **Wedding Website URL**: `https://your-site-name.netlify.app`
2. **Admin Dashboard URL**: `https://your-site-name.netlify.app/admin.html`
3. **Admin Instructions**:
   - Bookmark the admin dashboard
   - Check regularly for new RSVPs
   - Export data as needed

### **Client Access:**

- **Guests**: Can access the wedding website and submit RSVPs
- **Client**: Can access admin dashboard to view submissions
- **No login required** - admin dashboard is public (consider adding password protection)

---

## 🔒 **Security Considerations**

### **For Production:**

1. **Add Password Protection** to admin dashboard
2. **Use HTTPS** (automatic with Netlify)
3. **Regular backups** of RSVP data
4. **Monitor for spam** submissions

### **Adding Admin Password:**

You can add basic authentication by:
1. **Creating a simple login page**
2. **Using Netlify's password protection**
3. **Adding environment variables** for admin credentials

---

## 📊 **Monitoring & Maintenance**

### **Regular Tasks:**

1. **Check RSVP submissions** daily
2. **Export data** weekly
3. **Monitor website performance**
4. **Update content** as needed

### **Backup Strategy:**

1. **Download RSVP data** regularly
2. **Keep local copies** of all files
3. **Use version control** (GitHub)

---

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Website not loading**: Check Netlify deployment status
2. **RSVP not working**: Check API endpoints
3. **Admin dashboard empty**: Check data file permissions
4. **Email not sending**: Verify environment variables

### **Support:**

- **Netlify Support**: Available in dashboard
- **GitHub Issues**: For code problems
- **Email**: For urgent wedding-related issues

---

## 🎉 **Launch Checklist**

- [ ] Website deployed and accessible
- [ ] Admin dashboard working
- [ ] RSVP form functional
- [ ] Email notifications set up (optional)
- [ ] Test RSVP submission
- [ ] Share URLs with client
- [ ] Monitor for first real RSVPs

---

**Your wedding website is now live and ready for guests!** 🎊✨ 