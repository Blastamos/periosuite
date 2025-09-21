# PerioSuite - AI-Powered Periodontal Assessment Platform

A comprehensive Next.js application for dental practice management focused on periodontal assessment, built with modern technologies and best practices.

## 🚀 Features

- **Patient Management**: Complete patient records with medical history and risk factors
- **Periodontal Charting**: Interactive 32-tooth chart with AI-powered analysis
- **Risk Assessment**: Advanced PRA algorithms and BSP classification
- **Real-time Updates**: Live data synchronization with Supabase
- **Secure Authentication**: OTP-based admin authentication with Resend email service
- **Modern UI**: Beautiful interface built with shadcn/ui and Tailwind CSS
- **Type Safety**: Full TypeScript support with Zod validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js + OTP
- **Email**: Resend
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (for email)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd periosuite
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Resend
RESEND_API_KEY=your-resend-api-key

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Set up Row Level Security (RLS) policies as defined in the schema

### 4. Email Setup

1. Sign up for a Resend account
2. Get your API key from the Resend dashboard
3. Add it to your `.env.local` file

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
periosuite/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/             # Authentication
│   │   ├── patients/          # Patient management
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   └── ui/               # shadcn/ui components
│   └── lib/                  # Utilities and configurations
│       ├── supabase.ts       # Supabase client
│       ├── email.ts          # Email service
│       └── utils.ts          # Utility functions
├── supabase-schema.sql       # Database schema
└── components.json           # shadcn/ui configuration
```

## 🔐 Authentication

The application uses a secure OTP-based authentication system:

1. Admin users receive a 6-digit code via email
2. Codes expire after 10 minutes
3. Session management with secure cookies
4. Row Level Security (RLS) for data protection

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with:

- **Users**: Admin and practitioner accounts
- **Patients**: Complete patient records with demographics and medical history
- **Perio Charts**: 32-tooth periodontal charting data
- **Assessments**: AI-powered risk assessments and BSP classifications
- **OTP Tokens**: Secure authentication tokens

## 🎨 UI Components

Built with shadcn/ui for a modern, accessible interface:

- Responsive design
- Dark/light mode support
- Accessible components
- Consistent design system

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

### Database Migrations

Update the `supabase-schema.sql` file and run it in your Supabase SQL editor.

### API Routes

All API routes are in `src/app/api/` following Next.js App Router conventions.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:

- Email: support@periosuite.com
- Documentation: [docs.periosuite.com](https://docs.periosuite.com)
- Issues: GitHub Issues

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI analysis
- [ ] Integration with dental imaging systems
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Telemedicine features

---

Built with ❤️ for dental professionals worldwide.