# 🚀 Vercel Deployment Guide for Alpine Education Website

## 📋 Pre-Deployment Checklist

### ✅ Build Status
- [x] Clean build completed successfully
- [x] No TypeScript errors
- [x] No missing dependencies
- [x] Tailwind CSS v3 properly configured

### 🔧 Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Mailchimp Configuration
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your-audience-id

# Resend Email Service
RESEND_API_KEY=your-resend-api-key

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_PIXEL_ID=your-facebook-pixel-id

# Contact Information
NEXT_PUBLIC_WHATSAPP_NUMBER=+977-XXXXXXXXX
NEXT_PUBLIC_CONTACT_PHONE=+977-1-4XXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=info@alpineeducation.com

# Social Media URLs
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/alpineeducation
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/alpineeducation
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/alpineeducation

# Base URL
NEXT_PUBLIC_BASE_URL=https://alpineeducation.com
```

## 🌐 Vercel Deployment Steps

### 1. Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/sangam150/alpine-website-final`
4. Select the repository and click "Import"

### 2. Configure Project Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3. Add Environment Variables
1. In the Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add each environment variable from the list above
3. Make sure to set the correct environment (Production, Preview, Development)

### 4. Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Check the deployment logs for any errors

## 🔍 Post-Deployment Testing

### Core Functionality Tests
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Country pages load with content
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] WhatsApp integration works
- [ ] Mobile responsiveness

### Performance Tests
- [ ] Lighthouse score > 90
- [ ] Page load times < 3 seconds
- [ ] Images optimize correctly
- [ ] No console errors

### SEO Tests
- [ ] Meta tags are present
- [ ] Open Graph tags work
- [ ] Sitemap is accessible
- [ ] Robots.txt is present

## 🛠️ Troubleshooting

### Common Issues
1. **Build Failures**: Check for missing dependencies
2. **Environment Variables**: Ensure all required vars are set in Vercel
3. **Firebase Errors**: Verify Firebase credentials and project setup
4. **Image 404s**: Check if images are in the correct public directory

### Debug Steps
1. Check Vercel deployment logs
2. Test locally with `npm run build`
3. Verify environment variables are correctly set
4. Check Firebase project configuration

## 📞 Support
If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test functionality locally first
4. Contact support if needed

## 🎯 Success Criteria
- ✅ Website loads without errors
- ✅ All pages are accessible
- ✅ Forms submit successfully
- ✅ Mobile and desktop responsive
- ✅ Performance score > 90
- ✅ SEO optimized 