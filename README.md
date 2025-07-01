# Vue Profile Management System

A modern, responsive profile management application built with Nuxt 3, Vue 3, and Vuetify. This application features a beautiful glassmorphism design with comprehensive user profile management capabilities.

🌐 **Live Demo**: [https://vue-profile-management-system.vercel.app](https://vue-profile-management-system.vercel.app)

📁 **GitHub Repository**: [https://github.com/krisnafirdaus/vue-profile-management-system](https://github.com/krisnafirdaus/vue-profile-management-system)

## 🚀 Features

### ✅ Authentication System
- **Secure Login/Register** with comprehensive form validation
- **Remember Me functionality** with 1-year cookie option
- **Real-time validation** with helpful error messages
- **Responsive design** for all device types

### ✅ Profile Management
- **Multi-tab Profile System** with organized sections:
  - Basic Details (Salutation, Name, Email, Profile Photo)
  - Additional Details (Address, Country, Postal Code, DOB, Gender, Marital Status)
  - Spouse Details (Conditional - shown only when married)
  - Personal Preferences (Hobbies, Sports, Music, Movies)
- **Profile Image Upload** with preview functionality
- **Real-time Form Validation** using Yup schema validation
- **Age Validation** (minimum 17 years old)
- **Conditional Fields** (spouse details appear when married)
- **Editable Profile** with Update/Cancel buttons on all tabs

### ✅ Navigation & UX
- **Responsive Header Navigation** for desktop users
- **Hamburger Sidebar Menu** for mobile devices
- **Reusable Navigation Component** across all pages
- **Smooth Transitions** and animations
- **Touch-friendly Interface** for mobile devices

### ✅ Technical Excellence
- **Modern Tech Stack**: Nuxt 3, Vue 3, Vuetify 3, TypeScript
- **Form Validation**: Yup validation schemas with real-time feedback
- **API Integration**: Mock API with proper error handling
- **State Management**: Vue composables for auth, API, and validation
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **SEO Optimized**: Meta tags for all pages
- **Performance**: Optimized build with Vite

## 🛠 Tech Stack

- **Frontend Framework**: Nuxt 3 (Vue 3)
- **UI Framework**: Vuetify 3 with Material Design
- **Form Validation**: Yup validation schemas
- **Language**: TypeScript
- **Icons**: Material Design Icons (MDI)
- **Authentication**: Cookie-based session management
- **API**: Mock API with Nuxt server routes
- **Styling**: SCSS with glassmorphism effects
- **Build Tool**: Vite
- **Package Manager**: npm

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+): Full layout with all features
- **Tablet Landscape** (768px - 1199px): Adapted navigation and layout
- **Tablet Portrait** (600px - 767px): Mobile-optimized navigation
- **Mobile** (320px - 599px): Touch-friendly interface with stack layouts

## 🎨 Design Features

- **Glassmorphism UI** with frosted glass effects and backdrop blur
- **Animated Bokeh Background** with floating white transparent circles
- **Professional Typography** with Segoe UI font family
- **Consistent Color Scheme** with gradient backgrounds and modern styling
- **Responsive Logo Placeholder** with gradient background and border
- **Smooth Animations** for bokeh circles and UI interactions
- **Modern Form Design** with custom input styling and validation feedback
- **Interactive Elements** with hover effects and focus states
- **Loading States** with progress indicators
- **Success/Error Messages** with toast-style alerts
- **Mobile-Optimized Interface** with touch-friendly buttons and navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/krisnafirdaus/vue-profile-management-system.git
cd vue-profile-management-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000` (or the port shown in terminal)

### Demo Accounts
For testing purposes, any email and password combination will work:
- **Email**: `test@example.com` | **Password**: `password`
- **Email**: `john.doe@email.com` | **Password**: `password123`
- **Email**: `demo@test.com` | **Password**: `demo123`

The application uses mock authentication for demonstration purposes.

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run generate     # Generate static site

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🏗 Project Structure

```
vue-profile-management-system/
├── components/          # Reusable Vue components
│   └── NavigationMenu.vue # Reusable navigation component
├── composables/         # Vue composables for business logic
│   ├── useAuth.ts      # Authentication management
│   ├── useApi.ts       # API calls and data fetching
│   └── useValidation.ts # Form validation schemas
├── layouts/            # Application layouts
│   ├── default.vue     # Main layout
│   └── empty.vue       # Empty layout for auth pages
├── middleware/         # Route middleware
│   ├── auth.global.ts  # Global authentication guard
│   └── redirect.global.ts # Redirect middleware
├── pages/              # Application pages/routes
│   ├── index.vue       # Root redirect
│   ├── home.vue        # Home/Dashboard page
│   ├── login.vue       # Login page
│   ├── register.vue    # Registration page
│   ├── profile.vue     # Profile view page
│   └── edit-profile.vue # Profile editing page
├── plugins/            # Nuxt plugins
│   └── vuetify.ts      # Vuetify configuration
├── public/             # Static assets
│   ├── favicon.ico     # App favicon
│   ├── robots.txt      # SEO robots file
│   └── images/         # Image assets
├── server/             # Server-side API (mock)
│   └── api/            # API endpoints
│       ├── login.ts    # Authentication endpoint
│       ├── register.ts # Registration endpoint
│       └── profile.ts  # Profile management endpoint
├── nuxt.config.ts      # Nuxt configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🔐 Security Features

- **Input Validation**: Client-side validation with Yup schemas
- **XSS Protection**: Sanitized inputs and outputs
- **CSRF Protection**: Built-in Nuxt security features
- **Secure Cookies**: Proper cookie management for sessions
- **Password Requirements**: Form validation for secure passwords
- **Authentication Guards**: Route protection middleware

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Sufficient color contrast ratios
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper HTML structure
- **Alt Text**: Image descriptions for screen readers

## 🌐 Deployment

This application is deployed on **Vercel** and can be accessed at:
**🔗 [https://vue-profile-management-system.vercel.app](https://vue-profile-management-system.vercel.app)**

### Deploy Your Own

#### Vercel (Recommended)
1. Fork this repository
2. Connect your repository to Vercel
3. Deploy with automatic builds

#### Netlify
1. Build the application: `npm run generate`
2. Deploy the `dist` folder to Netlify

#### Traditional Hosting
1. Build for production: `npm run build`
2. Upload the `.output` folder to your server

## 📊 Performance Features

- **Optimized Build**: Vite-powered build system
- **Component Lazy Loading**: On-demand component loading
- **Responsive Images**: Optimized image loading
- **Modern CSS**: Efficient styling with SCSS
- **Tree Shaking**: Unused code elimination
- **Fast Navigation**: SPA routing with Nuxt

## 🧪 Features Tested

The application includes comprehensive testing for:
- **Form Validation**: All validation rules and error handling
- **User Authentication**: Login/register flow with session management
- **Profile Management**: CRUD operations for user profiles
- **Responsive Design**: Cross-device compatibility testing
- **Navigation**: Header and sidebar navigation functionality

## 🐛 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Safari**: iOS 12+
- **Chrome Mobile**: Android 8+

## 📈 SEO Features

- **Meta Tags**: Dynamic page titles and descriptions
- **Semantic HTML**: Proper HTML structure for SEO
- **Responsive Design**: Mobile-friendly for search engines
- **Clean URLs**: SEO-friendly routing with Nuxt

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 About

This project was created as a modern Vue.js profile management system demonstrating:
- Modern web development practices
- Responsive design principles  
- User experience best practices
- Clean code architecture
- Professional UI/UX design

## 🙏 Acknowledgments

- Vue.js and Nuxt teams for the excellent framework
- Vuetify team for the beautiful Material Design components
- Vercel for seamless deployment platform
- Open-source community for inspiration and resources

---

**🚀 Built with modern web technologies for optimal performance and user experience**
