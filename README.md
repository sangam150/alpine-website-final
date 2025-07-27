# Alpine Education & Visa Services Website

A comprehensive Next.js 15 website for Alpine Education & Visa Services, a Nepal-based study abroad consultancy. This platform provides students with information about study destinations, test preparation resources, and a complete student portal for application management.

## 🚀 Features

### Core Website Features

- **Modern Homepage** with hero section, testimonials, and Alpine AI chatbot
- **Study Destinations** with detailed country information and comparison tools
- **Test Preparation** with IELTS/PTE/TOEFL resources and voucher shop
- **Interactive Quizzes** for career guidance and country selection
- **Contact Page** with Google Maps integration and email functionality
- **Resources Section** with educational content and downloads
- **About Page** with company information and team details

### Student Portal

- **Authentication System** with Firebase Auth
- **Registration & Login** with email/password
- **Forgot Password** functionality
- **Document Upload** to Firebase Storage
- **Application Progress Tracking**
- **Real-time Status Updates**
- **Document Management** with approval workflow
- **Timeline Tracking** for application milestones

### Admin Dashboard

- **Student Management** with search and filtering
- **Document Approval** system
- **Application Status** management
- **Analytics Dashboard** with key metrics
- **Real-time Updates** from Firestore

### AI & Quiz System

- **Career Quiz** with personalized recommendations
- **Country Quiz** for study destination selection
- **PDF Report Generation** with results
- **Email Integration** for sending results
- **Firestore Integration** for data persistence

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firestore (Firebase)
- **Storage**: Firebase Storage
- **Email**: Resend API
- **Maps**: Google Maps API
- **Icons**: Lucide React
- **PDF Generation**: jsPDF

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── countries/         # Country-specific pages
│   ├── student-portal/    # Student portal
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── quiz/             # Quiz components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── firebase-config.ts # Firebase configuration
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Google Maps API key
- Resend API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd alpine-website-final
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

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
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Set up security rules for Firestore and Storage

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Set up security rules for Firestore:
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
     }
   }
   ```
4. Set up security rules for Storage:
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

### Google Maps API

1. Create a Google Cloud project
2. Enable Maps JavaScript API
3. Create an API key
4. Add the key to your environment variables

### Resend API

1. Sign up for Resend
2. Create an API key
3. Add the key to your environment variables

## 📱 Pages & Features

### Homepage (`/`)

- Hero section with call-to-action
- Services overview
- Testimonials carousel
- Alpine AI chatbot
- WhatsApp/Call CTAs
- Sticky CTA bar

### Study Destinations (`/countries`)

- Grid layout of countries
- Country flags and highlights
- Learn More buttons
- Embedded quiz
- SEO accordion
- Sticky comparison CTA
- Testimonials section

### Test Preparation (`/test-preparation`)

- Voucher shop
- Comparison table (IELTS/PTE/TOEFL)
- Batch schedules
- Free Mock Test CTA
- Clean section breakdown

### Student Portal (`/student-portal`)

- Authentication system
- Document upload functionality
- Application progress tracking
- Timeline management
- Real-time updates

### Admin Dashboard (`/admin`)

- Student management
- Document approval system
- Analytics dashboard
- Search and filtering
- Status management

### Contact Page (`/contact`)

- Google Maps integration
- Office details with icons
- Contact form with validation
- Email integration via Resend

## 🎯 Key Features

### Authentication System

- Firebase Auth integration
- Email/password authentication
- Password reset functionality
- Protected routes
- User session management

### Document Management

- File upload to Firebase Storage
- Multiple file type support (PDF, DOC, DOCX, JPG, PNG)
- File size validation (10MB limit)
- Download functionality
- Approval workflow

### Quiz System

- Interactive career quiz
- Country selection quiz
- Personalized recommendations
- PDF report generation
- Email result delivery
- Firestore data persistence

### Real-time Updates

- Firestore real-time listeners
- Live status updates
- Progress tracking
- Document status changes

## 🔒 Security Features

- Firebase security rules
- Input validation
- File type validation
- File size limits
- Protected API routes
- Authentication guards

## 📊 Analytics & Monitoring

- Application progress tracking
- Document upload analytics
- User engagement metrics
- Quiz completion rates
- Admin dashboard statistics

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:

- Email: info@alpineeducation.com
- Phone: +977-1-4XXXXXX
- Website: https://alpineeducation.com

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- Tailwind CSS for styling
- Lucide for beautiful icons
- All contributors and testers

---

**Alpine Education & Visa Services** - Your Gateway to Global Education
