# Alpine Education Website - Deployment Guide

## 🚀 Deployment Checklist

### ✅ Completed Features
- [x] **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, shadcn/ui
- [x] **Backend**: Firebase (Auth, Firestore, Storage)
- [x] **Email**: Resend integration for contact forms and handbook delivery
- [x] **SEO**: Complete metadata, Open Graph, Twitter cards, sitemap
- [x] **Performance**: Optimized images, lazy loading, minified assets
- [x] **Security**: Secure headers, environment variables, Firebase Auth rules
- [x] **Responsive**: Mobile-first design, all breakpoints tested
- [x] **Accessibility**: ARIA labels, keyboard navigation, focus states

### ✅ Core Pages Implemented
- [x] Homepage with hero, services, testimonials, country grid
- [x] Countries pages (Australia, UK, Canada, USA, Germany, France, NZ)
- [x] Test Preparation (IELTS, PTE, TOEFL)
- [x] Student Dashboard with document upload and progress tracking
- [x] Admin Panel with lead management and analytics
- [x] Contact page with Google Maps and Resend integration
- [x] Interactive Quiz with PDF handbook generation
- [x] About page with team and company information
- [x] Resources (Blog, Downloads, Handbooks, Mock Tests, FAQs)
- [x] Services (Profile Evaluation, Visa, SOP, Scholarships)

## 🌐 Deployment Steps

### 1. Environment Variables Setup

Create `.env.local` with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBRUIo7fIVU_5RN3QSh9SWMF7FsHSXUXX8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=alpine-website-final.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=alpine-website-final
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=alpine-website-final.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=717233032769
NEXT_PUBLIC_FIREBASE_APP_ID=1:717233032769:web:1432b2b3889b5c2123c0c0

# Resend Email Service
RESEND_API_KEY=your_resend_api_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-6ZDBWCRWMT

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@alpineeducation.com.np
NEXT_PUBLIC_CONTACT_PHONE=+977-1-4XXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=+977-XXXXXXXXX

# Social Media
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/alpineeducation
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/alpineeducation
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/alpineeducation
```

### 2. Vercel Deployment

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/alpine-education.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Custom Domain Setup**:
   - Add domain: `www.alpineeducation.com.np`
   - Configure DNS records as per Vercel instructions
   - Enable SSL certificate

### 3. Firebase Configuration

1. **Firebase Console**:
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Select project: `alpine-website-final`
   - Enable Authentication (Google provider)
   - Set up Firestore rules
   - Configure Storage rules

2. **Firestore Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Admins can read all leads
       match /leads/{leadId} {
         allow read, write: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
   ```

3. **Storage Rules**:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /documents/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### 4. Email Service Setup

1. **Resend Configuration**:
   - Sign up at [resend.com](https://resend.com)
   - Get API key
   - Verify domain: `alpineeducation.com.np`
   - Add to environment variables

2. **Custom Email Domain**:
   - Set up MX records for `alpineeducation.com.np`
   - Configure SPF and DKIM records
   - Test email delivery

### 5. Analytics & Monitoring

1. **Google Analytics**:
   - Create GA4 property
   - Add tracking code (already implemented)
   - Set up goals and conversions

2. **Error Monitoring**:
   - Set up Sentry or similar service
   - Monitor for JavaScript errors
   - Track performance metrics

## 🔧 Post-Deployment Checklist

### ✅ Functionality Testing
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Contact form sends emails
- [ ] Quiz generates PDF handbooks
- [ ] Student dashboard uploads documents
- [ ] Admin panel manages leads
- [ ] WhatsApp floating button works
- [ ] Chatbot responds correctly

### ✅ Performance Testing
- [ ] Lighthouse score 90+ (Mobile & Desktop)
- [ ] Images load quickly
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] Fast loading times (<3s)

### ✅ SEO Verification
- [ ] Meta tags present on all pages
- [ ] Open Graph images load
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt configured
- [ ] Google Search Console setup

### ✅ Security Verification
- [ ] HTTPS enabled
- [ ] Firebase Auth working
- [ ] No sensitive data exposed
- [ ] Form validation working
- [ ] CSRF protection active

## 📊 Monitoring & Maintenance

### Daily Checks
- Monitor website uptime
- Check for new leads in admin panel
- Review contact form submissions
- Monitor error logs

### Weekly Tasks
- Update content if needed
- Review analytics data
- Check for broken links
- Test all forms

### Monthly Tasks
- Update testimonials
- Add new country information
- Review and update pricing
- Performance optimization

## 🆘 Troubleshooting

### Common Issues
1. **Build Errors**: Check environment variables
2. **Email Not Sending**: Verify Resend API key
3. **Firebase Errors**: Check authentication rules
4. **Performance Issues**: Optimize images and code

### Support Contacts
- Technical Issues: [your-email@domain.com]
- Content Updates: [content-team@alpineeducation.com.np]
- Domain Issues: [domain-provider-support]

## 🎯 Success Metrics

### Target KPIs
- Website load time: <3 seconds
- Mobile usability score: 95+
- Contact form conversion: >5%
- Student signups: Track monthly
- Admin panel usage: Monitor daily

### Analytics Goals
- Monthly visitors: 10,000+
- Contact form submissions: 500+
- Quiz completions: 200+
- Student registrations: 100+

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: [Current Date]
**Next Review**: [30 days from deployment] 