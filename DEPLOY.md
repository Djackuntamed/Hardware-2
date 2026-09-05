# Deployment Guide - GitHub & Vercel

Complete guide to deploy TJV Hardware website to GitHub and Vercel with automatic deployments.

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `tjv-hardware`
3. **Description**: "TJV General Hardware - Construction Materials"
4. **Visibility**: Public
5. Do NOT initialize with README
6. Click **Create repository**

## Step 2: Push to GitHub

```powershell
cd c:\Hardware\2

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tjv-hardware.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method A: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) → Dashboard
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select your `tjv-hardware` repository
5. Configuration:
   - **Framework**: Other
   - **Root Directory**: ./
6. Click **Deploy**

Done! Vercel assigns URL: `https://tjv-hardware.vercel.app`

### Method B: Vercel CLI

```powershell
# Install Vercel CLI (first time only)
npm install -g vercel

# Deploy from project directory
cd c:\Hardware\2
vercel --prod
```

## Step 4: Verify Deployment

Test that everything works:

```
✅ Visit: https://tjv-hardware.vercel.app
✅ Check logo appears in header
✅ Check hero image loads
✅ Check GIF animates
✅ Listen for audio jingle
✅ Test direct asset URLs:
   - https://tjv-hardware.vercel.app/tjv-logo.webp
   - https://tjv-hardware.vercel.app/tvj-hardware-jingle.mpeg
```

## Step 5: Continuous Deployment

After setup, deployments are automatic:

```powershell
# Make changes locally
code index.html

# Commit and push
git add .
git commit -m "Update: description"
git push

# Vercel automatically deploys (1-2 minutes)
```

## Updating Assets

```powershell
# Replace image/audio in public/
cp new-image.webp public/tjv-products-1080.webp

# Commit and deploy
git add public/
git commit -m "Update: New product image"
git push
```

## GitHub Authentication

If Git asks for password:

### Option 1: Personal Access Token
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Select: `repo`, `workflow`
4. Click **Generate token**
5. Copy token
6. Paste when Git prompts for password

### Option 2: GitHub CLI (Recommended)
```powershell
# Install GitHub CLI
winget install GitHub.cli

# Authenticate
gh auth login
```

### Option 3: SSH
```powershell
# Generate SSH key
ssh-keygen -t ed25519

# Add to GitHub: github.com/settings/keys

# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/tjv-hardware.git
```

## Troubleshooting

### Images Not Showing
- **Check**: Paths start with `/` (not `assets/`)
- **Clear**: Browser cache (Ctrl+Shift+Delete)
- **Test**: Incognito window

### Audio Not Playing
- **Verify**: `/tvj-hardware-jingle.mpeg` exists
- **Check**: Browser console (F12) for errors
- **Test**: Direct URL - `https://tjv-hardware.vercel.app/tvj-hardware-jingle.mpeg`

### Can't Push to GitHub
- Use Personal Access Token (see above)
- Or use GitHub CLI: `gh auth login`
- Or switch to SSH key

### Deployment Failed
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **Deployments** tab
4. Click failed deployment
5. Read build logs for error details

**Common causes:**
- Files not committed to Git
- Missing `/public/` directory
- Invalid `vercel.json` JSON syntax

## Custom Domain (Optional)

To use your own domain (e.g., `tjvhardware.ug`):

1. In Vercel → Project → Settings → **Domains**
2. Enter your domain
3. Follow DNS configuration steps
4. Wait 24-48 hours for DNS propagation

## Useful Commands

| Task | Command |
|------|---------|
| Check Git status | `git status` |
| View commit history | `git log --oneline` |
| Stage all changes | `git add .` |
| Commit changes | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Pull latest changes | `git pull` |
| Check remotes | `git remote -v` |

## Project Structure for Deployment

```
c:\Hardware\2\
├── public/                 ← All assets here (served publicly)
│   ├── tjv-logo.webp
│   ├── tjv-products-*.webp
│   ├── TJV General Hardware.gif
│   ├── tvj-products-slideshow.mp4
│   └── tvj-hardware-jingle.mpeg
├── index.html              ← Uses /filename paths
├── styles.css
├── script.js
├── vercel.json             ← Deployment config
├── .gitignore
├── .github/workflows/      ← GitHub Actions
└── .git/                   ← Git repository
```

## Support

- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Git Guide**: https://git-scm.com/doc

---

**Estimated time: 15 minutes total**

✅ Create repo (5 min) → ✅ Push code (2 min) → ✅ Deploy (5 min) → ✅ Test (3 min)

Your site is now live and updates automatically on every push!
