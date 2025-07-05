# Alpine Education Website - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Vercel account
- Firebase project
- GitHub repository

### 1. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project: `alpine-website-final`
   - Enable Firestore Database
   - Enable Storage
   - Enable Authentication

2. **Configure Firestore Collections**
   ```bash
   # Required collections:
   - countries
   - students
   - uploads
   - pages
   - adminUsers
   ```

3. **Set up Firebase Admin SDK**
   - Go to Project Settings > Service Accounts
   - Generate new private key
   - Download JSON file

### 2. Environment Variables

Add these to your Vercel project:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_STORAGE_BUCKET=your_project.appspot.com

# Email Configuration
RESEND_API_KEY=your_resend_api_key

# Base URL
NEXT_PUBLIC_BASE_URL=https://alpine-website-final.vercel.app
```

### 3. Vercel Deployment

1. **Connect GitHub Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Production ready admin panel and CMS"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repo to Vercel
   - Set environment variables
   - Deploy

3. **Custom Domain (Optional)**
   - Add custom domain in Vercel settings
   - Update DNS records

### 4. Admin Panel Setup

1. **Create Admin User**
   ```javascript
   // In Firebase Console > Authentication
   // Add user: admin@alpineedu.com
   // Set custom claims for admin role
   ```

2. **Initialize Firestore Data**
   ```javascript
   // Add sample countries data
   // Add sample students data
   // Add admin users
   ```

### 5. Testing Checklist

- [ ] Homepage loads correctly
- [ ] Admin login works
- [ ] Countries CRUD operations
- [ ] Students CRUD operations
- [ ] File uploads work
- [ ] Content management works
- [ ] User management works
- [ ] Student portal authentication
- [ ] Mobile responsiveness
- [ ] API routes function
- [ ] SEO metadata is correct

### 6. Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize logo and banner images
   - Compress PDFs and documents

2. **Caching Strategy**
   - Implement ISR for static pages
   - Cache API responses
   - Use CDN for static assets

3. **Bundle Optimization**
   - Analyze bundle size
   - Remove unused dependencies
   - Implement code splitting

### 7. Security Measures

1. **Firebase Security Rules**
   ```javascript
   // Firestore rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Admin access
       match /adminUsers/{userId} {
         allow read, write: if request.auth != null && 
           request.auth.token.role == 'admin';
       }
       
       // Student access
       match /students/{studentId} {
         allow read, write: if request.auth != null && 
           (request.auth.uid == studentId || 
            request.auth.token.role == 'admin');
       }
     }
   }
   ```

2. **Storage Security**
   ```javascript
   // Storage rules
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /uploads/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null && 
           request.auth.token.role == 'admin';
       }
     }
   }
   ```

### 8. Monitoring & Analytics

1. **Vercel Analytics**
   - Enable Vercel Analytics
   - Monitor performance metrics
   - Track user behavior

2. **Firebase Analytics**
   - Enable Firebase Analytics
   - Track user engagement
   - Monitor conversion rates

3. **Error Monitoring**
   - Set up error tracking
   - Monitor API failures
   - Track user feedback

### 9. Maintenance

1. **Regular Updates**
   - Update dependencies monthly
   - Monitor security advisories
   - Backup Firestore data

2. **Content Updates**
   - Use admin panel for content
   - Regular SEO optimization
   - Update country information

3. **Performance Monitoring**
   - Monitor Core Web Vitals
   - Optimize loading times
   - Improve user experience

### 10. Support & Documentation

1. **Admin Documentation**
   - Create admin user guide
   - Document CMS features
   - Provide troubleshooting guide

2. **Technical Documentation**
   - API documentation
   - Database schema
   - Deployment procedures

3. **User Support**
   - Contact forms
   - FAQ section
   - Live chat integration

## 🎯 Success Metrics

- **Performance**: < 3s load time
- **Uptime**: > 99.9%
- **SEO**: Top 10 for target keywords
- **User Engagement**: > 60s average session
- **Conversion Rate**: > 5% contact form submissions

## 🚨 Emergency Procedures

1. **Site Down**
   - Check Vercel status
   - Verify environment variables
   - Rollback if necessary

2. **Data Loss**
   - Restore from Firestore backups
   - Check version history
   - Contact Firebase support

3. **Security Breach**
   - Change admin passwords
   - Review access logs
   - Update security rules

---

**Deployment Status**: ✅ Production Ready
**Last Updated**: January 2024
**Version**: 1.0.0 