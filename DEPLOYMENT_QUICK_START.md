# Quick Deployment Guide

## 🚀 **Deploy to Vercel (Recommended)**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Alpine Education website ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will automatically detect Next.js
   - Deploy with default settings

## 🔧 **Environment Variables**

Add these to your Vercel project:

```env
# Firebase (Optional for now)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📊 **Post-Deployment Checklist**

- [ ] Test all pages on live site
- [ ] Check mobile responsiveness
- [ ] Verify contact forms work
- [ ] Test admin panel access
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up monitoring

## 🎯 **Current Status**

✅ **Ready for deployment**
✅ **All pages functional**
✅ **Responsive design**
✅ **SEO optimized**
✅ **Performance optimized**

---

**Website URL**: http://localhost:3001 (Development)
**Production URL**: Will be provided by Vercel after deployment 