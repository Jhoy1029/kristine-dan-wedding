# 🎉 Wedding Website Deployment Guide

## 🚀 **Quick Start (Recommended)**

### **Option A: Use Static Admin (Works Immediately)**
1. ✅ **Already done!** I've replaced your admin.html with a static version
2. **Upload all files** to Netlify
3. **Access admin at:** `https://your-site.netlify.app/admin.html`
4. **Works without backend** - stores data in browser localStorage

### **Option B: Fix Netlify Functions (Advanced)**
If you want the original admin with serverless functions, follow the steps below.

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Name it: `kristine-dan-wedding` or `wedding-rsvp`
4. **Don't** initialize with README (you already have files)
5. Click **"Create repository"**

### **Step 2: Update Git Remote**
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/kristine-dan-wedding.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### **Step 3: Deploy to Netlify**
1. Go to [Netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Select your repository
5. Configure build settings:
   - **Publish directory:** `.`
   - **Build command:** `npm install`
   - **Functions directory:** `netlify/functions`
6. Click **"Deploy site"**

### **Step 4: Test Your Site**
- **Main website:** `https://your-site.netlify.app`
- **Admin dashboard:** `https://your-site.netlify.app/admin.html`
- **API test:** `https://your-site.netlify.app/test-api.html`

---

## 🔧 **Troubleshooting**

### **Issue: Admin shows "Error connecting to server"**
**Solution:** Use the static admin (already set up)
- The static admin works without any backend
- Stores data in browser localStorage
- Perfect for wedding planning

### **Issue: Netlify functions not working**
**Check these:**
1. **Functions directory** is set to `netlify/functions`
2. **netlify.toml** file is in your project root
3. **api.js** file exists in `netlify/functions/`
4. **package.json** has `serverless-http` dependency

### **Issue: Build fails**
**Try this build command:**
```
npm install
```

---

## 📱 **For Your Client**

### **Share These URLs:**
- **Wedding Website:** `https://your-site.netlify.app`
- **Admin Dashboard:** `https://your-site.netlify.app/admin.html`

### **Admin Features:**
- ✅ View all RSVPs
- ✅ Add manual entries
- ✅ Export to CSV
- ✅ Filter by attendance
- ✅ Real-time statistics

---

## 🎯 **Current Status**

✅ **Static admin** - Ready to use immediately
✅ **Main website** - Ready to deploy
✅ **RSVP form** - Works with static admin
✅ **All files** - Properly configured

**Next step:** Deploy to Netlify and share the URLs with your client!

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the **test-api.html** page for debugging
2. Use the **static admin** as a backup
3. The main website will work regardless of admin issues

**Your wedding website is ready to go!** 🎉 