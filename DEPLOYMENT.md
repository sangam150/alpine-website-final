# Alpine Education Website - Deployment Guide

## 🚀 Production Deployment Guide

This guide will walk you through deploying the Alpine Education website to production.

---

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables

Ensure all environment variables are properly configured:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Resend API (for email functionality)
RESEND_API_KEY=your_resend_api_key

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Firebase Admin (for server-side operations)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
```

### ✅ Firebase Setup

1. **Enable Authentication**
   - Go to Firebase Console > Authentication
   - Enable Email/Password authentication
   - Add authorized domains

2. **Configure Firestore**
   - Go to Firebase Console > Firestore Database
   - Create database in production mode
   - Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /quiz-results/{resultId} {
      allow read, write: if request.auth != null;
    }
    match /messages/{messageId} {
      allow read, write: if true;
    }
  }
}
```

3. **Configure Storage**
   - Go to Firebase Console > Storage
   - Create storage bucket
   - Set up security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### ✅ Google Maps API

1. Create Google Cloud project
2. Enable Maps JavaScript API
3. Create API key with proper restrictions
4. Add domain restrictions for security

### ✅ Resend Email Setup

1. Sign up for Resend
2. Create API key
3. Verify domain for sending emails
4. Test email functionality

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

#### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure project settings

#### Step 3: Environment Variables

In Vercel dashboard:

1. Go to Project Settings > Environment Variables
2. Add all environment variables from the checklist above
3. Ensure `NEXT_PUBLIC_*` variables are set for Production, Preview, and Development

#### Step 4: Deploy

1. Vercel will automatically deploy on push to main branch
2. Monitor deployment logs
3. Test all functionality on live site

### Option 2: Netlify

#### Step 1: Build Configuration

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Option 3: AWS Amplify

#### Step 1: Amplify Configuration

Create `amplify.yml` in root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

#### Step 2: Deploy

1. Connect repository to AWS Amplify
2. Configure build settings
3. Add environment variables
4. Deploy

---

## 🔧 Post-Deployment Configuration

### 1. Domain Setup

1. **Custom Domain**: Configure in your hosting platform
2. **SSL Certificate**: Enable HTTPS (automatic with Vercel/Netlify)
3. **DNS Configuration**: Update DNS records

### 2. Firebase Security

1. **Update Authorized Domains**:
   - Go to Firebase Console > Authentication > Settings
   - Add your production domain

2. **Update Storage Rules**:
   - Ensure proper access control
   - Test file uploads

### 3. Email Configuration

1. **Verify Domain**: Complete domain verification in Resend
2. **Test Emails**: Send test emails to verify functionality
3. **Monitor Deliverability**: Check email delivery rates

### 4. Analytics Setup

1. **Google Analytics**: Add tracking code
2. **Firebase Analytics**: Enable in Firebase Console
3. **Error Monitoring**: Set up error tracking

---

## 🧪 Testing Checklist

### ✅ Core Functionality

- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Contact form submits successfully
- [ ] Student portal authentication works
- [ ] Admin dashboard is accessible
- [ ] Document upload functionality works
- [ ] Quiz system generates PDFs
- [ ] Email notifications are sent

### ✅ Performance

- [ ] Page load times < 3 seconds
- [ ] Images are optimized
- [ ] Mobile responsiveness
- [ ] SEO meta tags are present
- [ ] SSL certificate is active

### ✅ Security

- [ ] Firebase security rules are enforced
- [ ] API routes are protected
- [ ] File upload validation works
- [ ] Authentication guards are active

---

## 📊 Monitoring & Maintenance

### 1. Performance Monitoring

- Set up Vercel Analytics or similar
- Monitor Core Web Vitals
- Track user engagement metrics

### 2. Error Tracking

- Implement error boundary monitoring
- Set up Firebase Crashlytics
- Monitor API route errors

### 3. Regular Updates

- Keep dependencies updated
- Monitor security advisories
- Regular backups of Firestore data

### 4. Content Management

- Update country information regularly
- Refresh testimonials
- Keep contact information current

---

## 🆘 Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

#### 2. Environment Variables

- Ensure all `NEXT_PUBLIC_*` variables are set
- Check for typos in variable names
- Verify API keys are valid

#### 3. Firebase Issues

- Check Firebase project configuration
- Verify security rules
- Test authentication flow

#### 4. Email Not Working

- Verify Resend API key
- Check domain verification
- Test with simple email first

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)

---

## 🎉 Success Metrics

After deployment, monitor these key metrics:

### Technical Metrics

- **Uptime**: > 99.9%
- **Page Load Speed**: < 3 seconds
- **Error Rate**: < 1%

### Business Metrics

- **Contact Form Submissions**: Track conversion rates
- **Student Portal Registrations**: Monitor sign-ups
- **Quiz Completions**: Track engagement
- **Document Uploads**: Monitor usage

### User Experience

- **Mobile Usage**: > 60%
- **Bounce Rate**: < 40%
- **Session Duration**: > 2 minutes

---

**🎯 Your Alpine Education website is now ready for production!**

For additional support, contact the development team or refer to the project documentation.
