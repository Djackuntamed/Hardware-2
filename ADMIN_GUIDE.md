# Admin Panel Guide - TJV General Hardware

## Overview

The admin panel allows you to manage in-stock products displayed on the main website. Products are shown alongside the product catalogue slideshow with automatic image resizing to fit the display frame. **The admin panel is now password-protected for security.**

## Authentication

### First-Time Login
1. **Default Password**: `tjv2024`
2. Navigate to `/admin.html` or click the Admin link
3. Enter the password when prompted
4. You'll be logged in for 2 hours (session expires automatically)

### Changing Your Password
1. Once logged in, go to the "Security Settings" section
2. Enter your current password
3. Enter a new password (minimum 6 characters)
4. Click "Change Password"
5. Your new password will be saved and required for future logins

### Session Management
- **Session Duration**: 2 hours of inactivity
- **Auto-logout**: Sessions expire automatically for security
- **Manual Logout**: Click the "Logout" button anytime
- **Password Storage**: Stored securely in browser localStorage

## Accessing the Admin Panel ✨ UPDATED - Hidden Access

### Secret Admin Access
The admin panel access is now completely streamlined. To access admin:

1. **Go to the main website** (`index.html`)
2. **Look for the hero section** with "Build strong. Build right."
3. **Triple-click the period (.) after "right"** - You need to click it **3 times quickly** (within 2 seconds)
4. **Automatic redirect** to admin login page with notification message
5. **Enter your password** (default: `tjv2024`) when the admin panel loads

### Alternative Access
- Direct URL: Navigate directly to `/admin.html` in your browser
- This bypasses the hidden button but still requires password authentication

### Security Features
- **Hidden by default**: No visible admin access for regular visitors
- **Triple-click activation**: Prevents accidental discovery  
- **Direct navigation**: Goes straight to login page
- **Password protection**: Still requires login authentication
- **Visual feedback**: Gold glow effect when hovering over the secret trigger
- **Redirect notification**: Shows "Redirecting to admin panel..." message

## Adding a Product

1. Fill in the product details:
   - **Product Name**: The name of the item (e.g., "Premium Cement Bag")
   - **Category**: Select from predefined categories:
     - Building Essentials
     - Finishing Materials
     - Plumbing & Site Supplies
     - Tools & Equipment
     - Other
   - **Price per Unit (UGX)**: The cost in Ugandan Shillings
   - **Product Image**: Upload a product photo

2. **Image Preview**: Once you select an image, a preview will appear showing how it will look after resizing

3. Click **Add to Stock** to save the product

## Editing Products ✨ NEW

### How to Edit a Product
1. In the "Current Stock" section, find the product you want to edit
2. Click the **Edit** button on the product card
3. The form will populate with the current product details
4. **Modify any details you want to change**:
   - Product name
   - Category
   - Price per unit
   - Image (optional - leave empty to keep current image)
5. Click **Update Product** to save changes

### Edit Mode Features
- Form title changes to "Edit Product"
- Current product image shows in preview
- **Image is optional** when editing (keep current or upload new)
- Cancel button to exit edit mode
- Form validation ensures required fields are filled

### Tips for Editing
- **To keep current image**: Don't select a new image file
- **To replace image**: Select a new image file and it will be resized automatically
- **Multiple edits**: You can edit the same product multiple times
- **Real-time updates**: Changes appear immediately on the main website

## How Images Work

- Images are automatically resized to **400px × 300px** (the size of the display frame)
- Images maintain good quality at a compression level of 85%
- Maximum file size allowed is **5MB**
- Images are stored as Base64 data in the browser's localStorage
- **Edit mode**: Images are optional (keeps current image if none selected)

## Managing Stock

### Viewing Current Stock
- All added products appear in the "Current Stock" section below the form
- Each product card shows:
  - Product image (resized thumbnail)
  - Product name
  - Category
  - Price per unit
  - **Edit button** to modify the product
  - **Delete button** to remove the product

### Editing a Product ✨ NEW
- Click the **Edit** button on any product card
- Form populates with current details
- Modify any fields you want to change
- Image is optional (leave empty to keep current)
- Click **Update Product** to save

### Deleting a Product
- Click the **Delete** button on any product card
- Confirm the deletion when prompted (shows product name)
- The product will be removed immediately

## Real-Time Updates

- Products are stored in browser localStorage using the key `tjv-instock-items`
- Changes are reflected immediately on the main website
- If the main website is open in another tab, refresh it to see updates
- Each product receives a unique ID based on when it was added
- **Edit operations** maintain the same product ID

## Security Features ✨ NEW

### Password Protection
- **Default password**: `tjv2024` (change this immediately!)
- **Session-based**: Login lasts 2 hours
- **Auto-logout**: Sessions expire for security
- **Password storage**: Encrypted in browser localStorage

### Password Management
- **Change password**: Use the Security Settings section
- **Strong passwords**: Minimum 6 characters (recommend longer)
- **Password hints**: Default password shown on login screen
- **Lost password**: Clear browser localStorage and default will reset

### Security Best Practices
1. **Change the default password immediately**
2. Use a strong, unique password
3. Don't share your admin password
4. Log out when done (don't rely on auto-expiry)
5. Be aware that clearing browser cache removes password

## Data Storage

- **Authentication**: Password stored in `tjv-admin-password` localStorage key
- **Session**: Current session stored in `tjv-admin-session` localStorage key
- **Products**: All data is stored locally in your browser's localStorage
- **Persistence**: Data persists across browser sessions (until cache cleared)
- **No server**: No data is sent to a server (for now)

## Best Practices

### Security
- **Change default password immediately** after first login
- Use a password manager to generate strong passwords
- Log out when finished using the admin panel
- Don't access admin panel on public/shared computers

### Image Tips
- Use clear, well-lit product photos
- Square or landscape images work best
- Avoid images with too much white space
- The image will be centered and cropped to fit the 4:3 aspect ratio

### Product Management
- Use clear, descriptive names
- Include size/quantity if applicable
- Example: "Cement Bag (50kg)", "PVC Pipe 3 inch"
- **Edit instead of delete+add** for price changes or corrections
- Keep categories consistent for better organization

### Pricing
- Enter prices as whole numbers (no decimals)
- Prices are displayed as formatted currency (e.g., "50,000")
- Use the edit function to update prices easily

## Troubleshooting

### Login Issues
- **Forgot password**: Clear browser localStorage, default password will reset to `tjv2024`
- **Session expired**: Simply log in again with your password
- **Password not working**: Ensure caps lock is off, try typing carefully

### Image Upload Issues
- Check file size (max 5MB)
- Ensure file is a valid image format (JPG, PNG, WebP, etc.)
- Try a different image if the file is corrupted
- **Edit mode**: Images are optional, leave empty to keep current

### Products Don't Appear on Main Site
- Hard refresh the main website (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Verify localStorage is enabled in your browser
- Make sure you're logged into admin panel

### Lost Data
- **Lost password**: Clear localStorage, password resets to `tjv2024`
- **Lost products**: localStorage data is deleted when clearing browser cache
- Consider taking screenshots or exporting data before clearing cache
- **Edit conflicts**: If form seems stuck, click Cancel/Clear and try again

## Session Management

### Session Details
- **Duration**: 2 hours of inactivity
- **Extension**: Each action extends the session
- **Expiry**: Automatic logout when session expires
- **Multiple tabs**: Sessions work across browser tabs

### When Sessions Expire
- You'll be redirected to the login screen
- Simply enter your password again
- No data is lost (products remain saved)
- Previous edits are preserved

## Future Enhancements

Potential improvements:
- Backend server integration for persistent storage
- Multi-user support with user accounts
- Role-based permissions (viewer, editor, admin)
- Bulk upload of multiple products
- Category management and custom categories
- Stock quantity tracking
- Product analytics and views
- Export/import functionality
- Password reset via email

## Quick Reference

### Default Settings
- **Password**: `tjv2024`
- **Session**: 2 hours
- **File size**: Max 5MB
- **Image size**: 400×300px resized

### Key Actions
- **Login**: Enter password at admin.html
- **Add**: Fill form → Upload image → "Add to Stock"
- **Edit**: Click Edit → Modify fields → "Update Product"
- **Delete**: Click Delete → Confirm
- **Change password**: Security Settings → Current + New password
- **Logout**: Click Logout button
