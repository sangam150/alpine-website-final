# Alpine Education & Visa Services Website

A modern, responsive website for Alpine Education & Visa Services - a leading study abroad consultancy in Nepal. Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, and structured data
- **Performance**: Fast loading with optimized images and code splitting
- **PWA Ready**: Progressive Web App support with offline capabilities
- **Analytics**: Google Analytics and Meta Pixel integration
- **Newsletter**: Mailchimp integration for email marketing

### Pages & Components
- **Homepage**: Hero section, services overview, testimonials, country grid
- **Header**: Sticky navigation with mobile menu
- **Footer**: Comprehensive sitemap and contact information
- **Floating Actions**: WhatsApp, Quiz, and Apply Now buttons
- **Contact Page**: Contact form and office information
- **Quiz Page**: Study abroad assessment (placeholder)
- **Apply Page**: Application form (placeholder)

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions
- **Firebase**: Authentication, Firestore, and Storage (configured)
- **Form Handling**: React Hook Form with Zod validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Email**: Mailchimp
- **Analytics**: Google Analytics, Meta Pixel
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alpine-website
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

   # Google Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Meta Pixel
   NEXT_PUBLIC_PIXEL_ID=123456789

   # Mailchimp
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_SERVER_PREFIX=us1
   MAILCHIMP_AUDIENCE_ID=your_audience_id

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

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── quiz/              # Quiz page
│   ├── apply/             # Apply page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components
│   └── ui/                # shadcn/ui components
└── lib/                   # Utility libraries
    ├── analytics.ts       # Analytics configuration
    ├── firebase.ts        # Firebase configuration
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

## 📊 Analytics & Tracking

### Google Analytics
- Configured in `src/lib/analytics.ts`
- Tracks page views and custom events
- Set `NEXT_PUBLIC_GA_ID` in environment variables

### Meta Pixel
- Configured for Facebook advertising
- Tracks conversions and custom events
- Set `NEXT_PUBLIC_PIXEL_ID` in environment variables

## 📧 Newsletter Integration

### Mailchimp Setup
1. Create Mailchimp account
2. Get API key and audience ID
3. Configure in `src/lib/mailchimp.ts`
4. Test newsletter signup functionality

## 🔐 Security

- Environment variables for sensitive data
- Input validation on forms
- Secure headers configuration
- HTTPS enforcement in production

## 📈 Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts and CSS
- Lighthouse score optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@alpineeducation.com
- Phone: +977-1-4XXXXXXX
- WhatsApp: +977-XXXXXXXXX

## 🎯 Roadmap

- [ ] Interactive quiz with results
- [ ] Student dashboard
- [ ] Document upload functionality
- [ ] Payment integration
- [ ] Blog system
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Chat bot integration

---

**Built with ❤️ for Alpine Education & Visa Services**
