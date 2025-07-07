# Alpine Education & Visa Services Website

A modern, responsive website for Alpine Education & Visa Services - a leading study abroad consultancy in Nepal. Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, and structured data
- **Performance**: Fast loading with optimized images and code splitting
- **PWA Ready**: Progressive Web App support with offline capabilities
- **Analytics**: Google Analytics and Meta Pixel integration
- **Newsletter**: Mailchimp integration for email marketing
- **Sticky Navigation**: Modern navbar with dropdown menus and CTA buttons
- **Floating Actions**: WhatsApp and AI Chatbot positioned cleanly
- **Admin Panel**: Complete content management system with role-based access
- **Student Portal**: Secure student dashboard with document uploads and progress tracking
- **Firebase Backend**: Real-time database, authentication, and file storage

### Pages & Components
- **Homepage**: Hero section, services overview, testimonials, country grid
- **Header**: Sticky navigation with mobile menu and CTA buttons
- **Footer**: Comprehensive sitemap and contact information
- **Floating Actions**: WhatsApp and AI Chatbot buttons
- **Contact Page**: Contact form and office information
- **Quiz Page**: Study abroad assessment with personalized results
- **Apply Page**: Application form with guidance
- **Countries**: Study destinations with filters and search
- **About**: Company information and team details
- **Admin Panel**: Dashboard, content management, student management
- **Student Portal**: Application tracking, document uploads, progress monitoring

### Technical Features
- **Next.js 15**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions
- **Firebase**: Authentication, Firestore, and Storage (configured)
- **Form Handling**: React Hook Form with Zod validation
- **API Routes**: RESTful API endpoints for data management
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Email**: Mailchimp
- **Analytics**: Google Analytics, Meta Pixel
- **Deployment**: Vercel (recommended)

## 🔧 Recent Fixes

### Firebase Configuration
- ✅ Improved error handling for Firebase initialization
- ✅ Added proper TypeScript types for Firebase services
- ✅ Enhanced API route error handling with Firebase checks
- ✅ Added validation for country slugs and data

### Image Handling
- ✅ Fixed empty image src attributes
- ✅ Added fallback images for all components
- ✅ Improved error handling for image loading

### SEO & Performance
- ✅ Updated manifest.json to only reference existing icons
- ✅ Fixed robots.txt domain configuration
- ✅ Updated sitemap.ts to use environment variables
- ✅ Added proper error boundaries and loading states

### API Routes
- ✅ Enhanced error handling in all API routes
- ✅ Added input validation for all endpoints
- ✅ Improved Firebase initialization checks
- ✅ Added proper TypeScript types

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sangam150/alpine-website-final.git
   cd alpine-website-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-domain.com

   # Google Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Meta Pixel
   NEXT_PUBLIC_PIXEL_ID=123456789

   # Mailchimp
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_SERVER_PREFIX=us1
   MAILCHIMP_AUDIENCE_ID=your_audience_id

   # Resend Configuration (Optional)
   RESEND_API_KEY=your_resend_api_key

   # Contact Information
   NEXT_PUBLIC_CONTACT_EMAIL=info@alpineeducation.com
   NEXT_PUBLIC_CONTACT_PHONE=+977-1-4XXXXXXX
   NEXT_PUBLIC_WHATSAPP_NUMBER=+977-XXXXXXXXX

   # Social Media
   NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/alpineeducation
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/alpineeducation
   NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/alpineeducation
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   - Admin panel: `http://localhost:3000/admin`
   - Student portal: `http://localhost:3000/student-portal`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── quiz/              # Quiz page
│   ├── apply/             # Apply page
│   ├── countries/         # Study destinations
│   ├── about/             # About page
│   ├── services/          # Student services
│   ├── test-preparation/  # Test prep pages
│   ├── resources/         # Resources pages
│   ├── student-portal/    # Student portal
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utility libraries
    ├── analytics.ts       # Analytics configuration
    ├── firebase-config.ts # Firebase configuration
    ├── mailchimp.ts       # Mailchimp configuration
    └── utils.ts           # Utility functions
```

## 🎨 Customization

### Colors & Branding
The website uses a blue-based color scheme. To customize:

1. **Primary Colors**: Update in `tailwind.config.js`
2. **Brand Colors**: Modify CSS variables in `src/app/globals.css`
3. **Logo**: Replace logo in header and footer components

### Content
- **Text Content**: Update content in component files
- **Images**: Replace images in `public/` directory
- **Contact Info**: Update in environment variables and components

### Styling
- **Components**: Modify shadcn/ui components in `src/components/ui/`
- **Layout**: Update layout components in `src/components/layout/`
- **Animations**: Customize Framer Motion animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

**Environment Variables for Vercel:**
- Add all environment variables from `.env.local` to Vercel dashboard
- Ensure `NEXT_PUBLIC_*` variables are set for client-side access

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 📱 PWA Features

The website includes PWA support with:
- Service worker for offline functionality
- App manifest for installation
- Responsive design for all devices
- Fast loading and caching

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add `page.tsx` file
3. Export metadata and default component
4. Update navigation in header component

### Adding New Components
1. Create component file in appropriate directory
2. Import and use shadcn/ui components
3. Add TypeScript types if needed
4. Test component functionality

## 🐛 Known Issues & Solutions

### Firebase Initialization
- **Issue**: Firebase may fail to initialize in development
- **Solution**: Check environment variables and Firebase project configuration
- **Fallback**: App uses mock data when Firebase is unavailable

### Image Loading
- **Issue**: Some images may not load properly
- **Solution**: All images have fallback to `/og-image.jpg`
- **Prevention**: Ensure all referenced images exist in `public/` directory

### API Routes
- **Issue**: API routes may return errors
- **Solution**: All routes include proper error handling and validation
- **Monitoring**: Check browser console and server logs for detailed errors

## 📞 Support

For support, email support@alpineeducation.com or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by Alpine Education & Visa Services**
