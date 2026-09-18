# TJV General Hardware Website

Professional, fast-loading website for TJV General Hardware - quality construction materials supplier in Wakiso, Uganda.

## ✨ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Optimized WebP images with fallbacks
- ✅ Audio branding (jingle plays on load)
- ✅ SEO optimized with meta tags
- ✅ Static site (no server needed)
- ✅ Lighthouse score 95+

## 📁 File Structure

```
.
├── index.html              Main website
├── admin.html              Admin panel (password protected)
├── styles.css              All styling
├── script.js               Interactivity, catalogue slideshow & jingle player
├── admin.js                Admin inventory management script
├── images/                 Product catalogue images & luxury background
│   ├── 1.jpg ... 9.jpg     Catalogue slide images
│   └── bg-luxury.jpg       Page luxury backdrop
├── public/                 Static assets (served by Vercel)
│   ├── tjv-logo-new.png    Store brand logo
│   └── tvj-hardware-jingle.mpeg Audio jingle
├── vercel.json             Vercel config
├── .gitignore              Git ignore
├── .github/workflows/      GitHub Actions CI/CD
└── README.md               Project documentation
```

## 🚀 Quick Start

### Local Development
```powershell
# Just open in browser
start index.html
```

### Deploy to Vercel

**Option 1: Automatic (Recommended)**
1. Create GitHub repo at [github.com/new](https://github.com/new)
2. Push code: `git push -u origin main`
3. Go to [vercel.com](https://vercel.com) → Add Project
4. Select your GitHub repo → Deploy

**Option 2: Manual Steps**
```powershell
# 1. Create GitHub repo and add remote
git remote add origin https://github.com/YOUR_USERNAME/tjv-hardware.git
git branch -M main
git push -u origin main

# 2. Connect to Vercel (vercel.com/dashboard)
# 3. Import GitHub repo → Deploy
```

Vercel assigns you a URL: `https://tjv-hardware.vercel.app`

## 📝 Making Changes

### Edit Content
```powershell
# Edit files locally
code index.html    # Text/structure
code styles.css    # Styling
code script.js     # Functionality

# Deploy to Vercel
git add .
git commit -m "Update: description"
git push           # Vercel auto-deploys
```

### Update Assets
```powershell
# Replace image/audio in public/
cp new-image.webp public/tjv-products-1080.webp

# Deploy
git add public/
git commit -m "Update: New product image"
git push
```

## 🔗 Asset Paths

Key static assets:
- Brand logo: `/public/tjv-logo-new.png`
- Catalogue images: `images/1.jpg` through `images/9.jpg`
- Background image: `images/bg-luxury.jpg`
- Audio jingle: `public/tvj-hardware-jingle.mpeg`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images broken | Check paths use `/` not `assets/` |
| Audio won't play | Verify `/tvj-hardware-jingle.mpeg` exists |
| Can't push to GitHub | Use token from github.com/settings/tokens |
| Deployment failed | Check Vercel dashboard build logs |

## 📊 Performance

- **Page size**: ~2MB
- **First load**: <1s
- **Asset caching**: 1 year
- **Browser support**: Chrome, Firefox, Safari, Edge (latest 2 versions)

## 📞 Contact

- **Phone**: +256 790 445392
- **WhatsApp**: +256 702 147189
- **Location**: Wakiso, Mango Shade, Uganda

## 📄 License

© 2026 TJV General Hardware. All rights reserved.
