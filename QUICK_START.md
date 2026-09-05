# Quick Start Guide

## Getting Started in 4 Steps

### Step 1: Access the Admin Panel ✨ SECRET ACCESS
**The admin access is now hidden and direct!**

**To access admin:**
1. Go to the main website (`index.html`)
2. Find the hero text "Build strong. Build right."
3. **Triple-click the period (.) after "right"** (3 clicks within 2 seconds)
4. **Automatic redirect** to admin login page
5. No need to look for admin button - goes directly to login!

**Alternative:** Go directly to `admin.html` in your browser

### Step 2: Login with Admin Password
- **Default Password**: `tjv2024`
- Enter the password when prompted
- You'll be logged in for 2 hours
- **Important**: Change this password immediately after first login!

### Step 3: Add Your First Product
1. **Product Name**: Type the item name (e.g., "Cement Bag 50kg")
2. **Category**: Select from the dropdown
3. **Price**: Enter the price in UGX (e.g., 50000)
4. **Image**: Click to upload a product photo
5. See the preview appear
6. Click **"Add to Stock"**

### Step 4: View on Main Site ✨ UPDATED
- Go back to `index.html`
- Scroll to the Products section
- **Your product now appears in TWO places**:
  1. **Slideshow** (left side) - Your product cycles through with other in-stock items
  2. **In-Stock Items list** (right side) - Shows all products with details
- Navigate the slideshow manually with arrow buttons
- **Hover over slideshow** to see product details overlay (name, category, price)

## Security Setup (IMPORTANT!)

### First Login - Change Your Password
1. After logging in with `tjv2024`, go to **Security Settings**
2. Enter current password: `tjv2024`
3. Enter your new password (minimum 6 characters)
4. Click **"Change Password"**
5. **Write down your new password** - you'll need it next time!

### Session Management
- **Auto-logout**: After 2 hours of inactivity
- **Manual logout**: Click the "Logout" button anytime
- **Forgot password?**: Clear browser cache, password resets to `tjv2024`

## What Happens Automatically

✅ **Password protection** - Admin panel is secure
✅ **Image automatically resized** to fit the display frame (400×300px)
✅ **Product saved** and will persist even after closing the browser
✅ **Price formatted** with thousands separator
✅ **Image optimized** for fast loading
✅ **Dynamic slideshow** showing your in-stock products with hover details
✅ **Product info overlay** (name, category, price) appears on hover
✅ **Session management** - auto-logout for security

## Admin Panel Features

### Security
- **Password login** required
- **Session timeout** (2 hours)
- **Password change** functionality
- **Logout** button for security

### Adding Products
- Fill form → Upload image → See preview → Click "Add to Stock"
- Max file size: 5MB
- Supported formats: JPG, PNG, WebP, GIF, etc.

### Editing Products ✨ NEW
- Click **Edit** button on any product card
- Modify any details (name, category, price, image)
- **Image is optional** when editing (keeps current if none selected)
- Click **Update Product** to save changes

### Managing Products
- See all products in "Current Stock" section
- Click **Edit** to modify any product details
- Click **Delete** to remove from stock
- Products update in real-time

## Common Tasks

### Login to Admin Panel
1. Go to admin.html
2. Enter password (default: `tjv2024`)
3. Access granted for 2 hours

### Change Your Password (Do This First!)
1. Go to "Security Settings" section
2. Enter current password
3. Enter new password (min 6 characters)
4. Click "Change Password"

### Upload a Product
1. Fill in all required fields
2. Upload an image
3. Click "Add to Stock"

### Edit a Product ✨ NEW
1. Find product in "Current Stock"
2. Click "Edit" button
3. Modify any fields you want to change
4. Leave image empty to keep current, or upload new one
5. Click "Update Product"

### Remove a Product
1. Find product in "Current Stock"
2. Click "Delete"
3. Confirm deletion

### Logout
1. Click "Logout" button in Security Settings
2. You'll be redirected to login screen

## Edit Mode Features ✨ NEW

### What You Can Edit
- **Product Name**: Change the title
- **Category**: Switch to different category
- **Price**: Update the price per unit
- **Image**: Replace with new image (or keep current)

### How Editing Works
1. Click **Edit** on any product card
2. Form fills with current product details
3. **Modify whatever you want to change**
4. **Image is optional** - leave empty to keep current image
5. Click **Update Product**
6. Changes appear immediately

### Edit Tips
- **Keep current image**: Don't select a new image file
- **Replace image**: Select new file and it will resize automatically
- **Cancel editing**: Click "Cancel/Clear" to exit edit mode
- **Form validation**: Required fields must be filled

## File Structure

```
Hardware/2/
├── index.html          (Main website)
├── admin.html          (Admin panel with login)
├── script.js           (Main site JavaScript)
├── admin.js            (Admin panel with auth & edit)
├── styles.css          (All styling)
├── QUICK_START.md      (This file)
├── ADMIN_GUIDE.md      (Detailed admin guide)
└── FEATURE_SUMMARY.md  (Technical details)
```

## Troubleshooting

### Admin Access Issues ✨ NEW
- **Can't find secret access?**: Triple-click the period after "Build right." in the hero section
- **Triple-click not working?**: Click 3 times quickly (within 2 seconds) on the period (.)
- **No redirect happening?**: Check browser console for JavaScript errors
- **Still can't access?**: Go directly to `admin.html` in your browser address bar

### Login Issues
- **Can't login?**: Make sure you're using the right password
- **Forgot password?**: Clear browser localStorage, password resets to `tjv2024`
- **Session expired?**: Just login again with your password

### Products Not Showing?
- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Make sure you're logged into admin panel
- Check localStorage isn't disabled in browser

### Image Upload Failed?
- File size over 5MB? Try a smaller image
- Check file format (JPG, PNG, WebP, etc.)
- Try a different image file

### Edit Mode Issues?
- **Stuck in edit mode?**: Click "Cancel/Clear" button
- **Changes not saving?**: Make sure required fields are filled
- **Image issues?**: Remember image is optional when editing

### Lost Access?
- **Lost password**: Clear browser cache, resets to `tjv2024`
- **Lost product data**: Clearing cache = losing products
- Take screenshots before clearing cache

## Default Settings

### Security
- **Default password**: `tjv2024` (CHANGE THIS!)
- **Session duration**: 2 hours
- **Password minimum**: 6 characters

### Technical
- **Max file size**: 5MB
- **Image resize**: 400×300px
- **Storage**: Browser localStorage
- **Formats**: JPG, PNG, WebP, GIF, etc.

## Best Practices

### Security First
1. **Change default password immediately**
2. Use a strong password (longer than 6 characters)
3. Don't share your admin password
4. Log out when finished
5. Don't use admin panel on public computers

### Product Management
1. **Use edit feature** instead of delete+add for changes
2. **Clear naming**: Be specific (e.g., "PVC Pipe 3-inch" not just "Pipe")
3. **Good photos**: Clear, well-lit images work best
4. **Regular updates**: Keep prices current using edit feature
5. **Consistent categories**: Use same categories for organization

### Image Tips
1. Clear, well-lit photos work best
2. Square or landscape images preferred
3. Avoid too much white space
4. When editing, leave image field empty to keep current image

## Quick Commands

| Action | Steps |
|--------|-------|
| **Login** | admin.html → Enter password |
| **Change Password** | Security Settings → Current + New password |
| **Add Product** | Fill form → Upload image → "Add to Stock" |
| **Edit Product** | Find product → "Edit" → Modify → "Update Product" |
| **Delete Product** | Find product → "Delete" → Confirm |
| **Logout** | Click "Logout" button |

## Security Reminders

🔒 **Change the default password (`tjv2024`) immediately!**
🔒 **Use a strong, unique password**
🔒 **Log out when finished**
🔒 **Don't share admin credentials**
🔒 **Sessions expire after 2 hours for security**

---

**You're all set!** Start by changing your password, then add products and manage your inventory securely. 🚀
