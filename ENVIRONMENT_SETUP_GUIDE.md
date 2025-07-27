# 🔧 ALPINE EDUCATION & VISA SERVICES - ENVIRONMENT SETUP GUIDE

## 🚀 **PRODUCTION ENVIRONMENT CONFIGURATION**

This guide will help you set up all the necessary environment variables and services for the production deployment of the Alpine Education & Visa Services platform.

---

## 📋 **REQUIRED ENVIRONMENT VARIABLES**

### **Firebase Configuration**
```bash
# Firebase Web App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
```

### **Email Service (Resend)**
```bash
RESEND_API_KEY=re_your_resend_api_key_here
```

### **AI Services (OpenAI)**
```bash
OPENAI_API_KEY=sk-your_openai_api_key_here
```

### **Analytics (Google Analytics)**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Payment Services**
```bash
# eSewa Configuration
ESEWA_MERCHANT_ID=your_esewa_merchant_id
ESEWA_SECRET_KEY=your_esewa_secret_key

# Khalti Configuration
KHALTI_SECRET_KEY=your_khalti_secret_key
KHALTI_PUBLIC_KEY=your_khalti_public_key
```

### **Additional Services**
```bash
# Mailchimp (Newsletter)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id

# Google Sheets (Data Export)
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Google Sheets Private Key\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://your_sentry_dsn_here
```

---

## 🔥 **FIREBASE SETUP INSTRUCTIONS**

### **Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `alpine-education`
4. Enable Google Analytics (optional)
5. Click "Create project"

### **Step 2: Configure Authentication**
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable Email/Password authentication
4. Add your domain to authorized domains
5. Configure sign-in methods as needed

### **Step 3: Set up Firestore Database**
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (preferably close to Nepal)
5. Create the database

### **Step 4: Configure Storage**
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in production mode"
4. Select the same location as Firestore

### **Step 5: Get Configuration**
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Register app with name "Alpine Education"
5. Copy the configuration object

### **Step 6: Generate Admin SDK Key**
1. In Project Settings, go to "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the private key and client email

---

## 📧 **RESEND EMAIL SETUP**

### **Step 1: Create Resend Account**
1. Go to [Resend](https://resend.com/)
2. Sign up for an account
3. Verify your email address

### **Step 2: Get API Key**
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give it a name like "Alpine Education Production"
4. Copy the API key

### **Step 3: Verify Domain (Optional)**
1. Go to "Domains"
2. Add your domain (alpineeducation.com)
3. Follow DNS verification steps
4. This improves email deliverability

---

## 🤖 **OPENAI API SETUP**

### **Step 1: Create OpenAI Account**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up for an account
3. Add payment method

### **Step 2: Get API Key**
1. Go to "API Keys"
2. Click "Create new secret key"
3. Give it a name like "Alpine Education AI"
4. Copy the API key

### **Step 3: Set Usage Limits**
1. Go to "Usage"
2. Set appropriate limits for your budget
3. Monitor usage regularly

---

## 📊 **GOOGLE ANALYTICS SETUP**

### **Step 1: Create GA4 Property**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Enter property name: "Alpine Education"
4. Configure data stream for web
5. Enter website URL: https://alpineeducation.com

### **Step 2: Get Measurement ID**
1. In the data stream, copy the Measurement ID
2. Format: G-XXXXXXXXXX

### **Step 3: Configure Events**
1. Go to "Events"
2. Set up custom events for:
   - Application submissions
   - Payment completions
   - AI feature usage
   - User registrations

---

## 💳 **PAYMENT GATEWAY SETUP**

### **eSewa Setup**
1. Contact eSewa for merchant account
2. Provide business documentation
3. Get merchant ID and secret key
4. Test in sandbox environment first

### **Khalti Setup**
1. Contact Khalti for business account
2. Complete KYC process
3. Get public and secret keys
4. Test in development environment

---

## 🚀 **VERCEL DEPLOYMENT SETUP**

### **Step 1: Create Vercel Account**
1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Import the Alpine Education repository

### **Step 2: Configure Environment Variables**
1. In Vercel dashboard, go to project settings
2. Navigate to "Environment Variables"
3. Add all the variables listed above
4. Set them for "Production" environment

### **Step 3: Configure Domain**
1. Go to "Domains"
2. Add custom domain: alpineeducation.com
3. Configure DNS settings
4. Enable automatic SSL

---

## 🔐 **SECURITY CHECKLIST**

### **Environment Variables**
- [ ] All API keys are secure and not committed to git
- [ ] Firebase private key is properly formatted
- [ ] Google Sheets private key is properly formatted
- [ ] All keys have appropriate permissions

### **Firebase Security Rules**
- [ ] Firestore rules are configured for security
- [ ] Storage rules are configured for security
- [ ] Authentication is properly set up
- [ ] Admin SDK is configured correctly

### **Domain Security**
- [ ] SSL certificate is active
- [ ] Domain is verified in all services
- [ ] DNS records are properly configured
- [ ] Security headers are set

---

## 📱 **TESTING CHECKLIST**

### **Pre-Deployment Testing**
- [ ] All environment variables are set
- [ ] Firebase connection works
- [ ] Email sending works
- [ ] AI features work
- [ ] Payment integration works
- [ ] Analytics tracking works

### **Post-Deployment Testing**
- [ ] Website loads correctly
- [ ] All forms submit successfully
- [ ] Payment processing works
- [ ] Email notifications are sent
- [ ] Admin dashboard is accessible
- [ ] Student portal works

---

## 🎯 **QUICK SETUP COMMANDS**

### **Local Environment Setup**
```bash
# Copy environment template
cp env-template.txt .env.local

# Edit environment variables
notepad .env.local

# Install dependencies
npm install

# Run development server
npm run dev
```

### **Production Deployment**
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 📞 **SUPPORT CONTACTS**

### **Technical Support**
- **Firebase Support**: https://firebase.google.com/support
- **Vercel Support**: https://vercel.com/support
- **Resend Support**: https://resend.com/support
- **OpenAI Support**: https://help.openai.com/

### **Payment Gateway Support**
- **eSewa Support**: [Contact eSewa directly]
- **Khalti Support**: [Contact Khalti directly]

---

## 🎉 **READY FOR LAUNCH**

Once all environment variables are configured:

1. **Test locally**: `npm run dev`
2. **Build project**: `npm run build`
3. **Deploy to Vercel**: `vercel --prod`
4. **Configure domain**: Set up DNS
5. **Test production**: Verify all features work
6. **Launch marketing**: Begin customer acquisition

**🚀 The Alpine Education & Visa Services platform is ready to revolutionize the international education market in Nepal!** 