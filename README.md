# VukaWiFi Billing System - Frontend

A comprehensive, production-grade WiFi billing system frontend built with React, TailwindCSS V4, and modern web technologies. This system provides both a customer-facing captive portal and an admin dashboard for managing WiFi access and payments.

## 🚀 Features

### Customer Portal (Captive Portal)

- **Premium UI Design**: High-end, responsive design with smooth animations
- **WiFi Plan Selection**: Multiple plans (1 Hour, 1 Day, 1 Week, 1 Month) with detailed features
- **M-Pesa Integration**: Seamless phone number-based payment flow
- **Real-time Payment Processing**: Live payment status updates with loading states
- **WiFi Credentials Delivery**: Automatic credential generation and display
- **Mobile-First Design**: Fully responsive for all device sizes

### Admin Dashboard

- **Comprehensive Analytics**: Revenue tracking, user statistics, and success rates
- **Payment Management**: Complete payment history with filtering and search
- **Real-time Monitoring**: Active WiFi sessions and connection management
- **Modern Sidebar Navigation**: Professional admin interface with role-based access
- **Detailed Payment Views**: Individual payment details with M-Pesa receipts
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Technology Stack

- **React 19+** - Modern React with hooks and functional components
- **TailwindCSS V4** - Latest version with custom utilities and theme system
- **Vite** - Fast build tool and development server
- **Custom UI Components** - Reusable component library
- **SVG Icons** - Lightweight, custom icon system
- **Modern JavaScript** - ES6+ features and best practices

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vuka-wifi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Demo Usage

The application starts with a demo selector that allows you to choose between:

### Customer Portal

- View available WiFi plans with detailed pricing and features
- Select a plan and proceed to payment
- Enter phone number for M-Pesa payment simulation
- Receive WiFi credentials after successful payment
- Experience the complete customer journey

### Admin Dashboard

- **Login Credentials:**
  - Email: `admin@vukawifi.online`
  - Password: `admin123`
- Explore dashboard analytics and statistics
- Manage payments with search and filtering
- View detailed payment information
- Navigate through different management sections

## 🎨 Custom TailwindCSS V4 Features

The project uses TailwindCSS V4 with custom utilities:

### Custom Colors

- Primary colors (blue shades)
- Success, danger, warning color palettes
- OKLCH color space for better color consistency

### Custom Utilities

- `.glass` - Glassmorphism effect
- `.gradient-primary` - Custom gradient backgrounds
- `.shadow-glow` - Special glow effects
- `.text-gradient` - Gradient text effects
- `.animate-float` - Floating animations

### Component Classes

- `.btn-primary` - Primary button styling
- `.card` - Card component with shadows
- `.input-field` - Consistent input styling
- `.plan-card` - Special styling for plan selection

## 📱 Responsive Design

The interface is fully responsive with:

- Mobile-first approach
- Responsive text scaling with `clamp()`
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance on mobile devices

## 🔧 Component Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Input.jsx           # Form input component
│   │   ├── Card.jsx            # Card containers
│   │   └── Icons.jsx           # SVG icon library
│   ├── captive/
│   │   └── CaptivePortal.jsx   # Customer-facing portal
│   └── admin/
│       ├── AdminLogin.jsx      # Admin authentication
│       ├── AdminDashboard.jsx  # Main admin interface
│       └── PaymentsManager.jsx # Payment management
├── index.css                   # TailwindCSS V4 custom styles
└── App.jsx                     # Main application component
```

## 💡 Key Features Explained

### Phone Number-Based Payments

- No customer account registration required
- Simple phone number entry for M-Pesa payments
- Automatic WiFi credential generation
- Time-based access control

### Admin Management

- Real-time payment monitoring
- Comprehensive analytics dashboard
- Search and filter capabilities
- Detailed payment tracking
- Professional admin interface

### Modern UI/UX

- Smooth animations and transitions
- Loading states and feedback
- Error handling and validation
- Accessible design patterns
- Premium visual design

## 🚀 Production Readiness

This frontend is designed for production use with:

- Optimized build process
- Component-based architecture
- Scalable styling system
- Performance optimizations
- SEO-friendly structure
- Error boundaries (can be added)

## 🔮 Future Enhancements

When connecting to a backend API:

- Real M-Pesa payment integration
- Live data updates
- User session management
- Advanced analytics
- Notification systems
- Multi-language support

## 📄 License

This project is designed as a demonstration of a production-grade WiFi billing system frontend. Customize and adapt as needed for your specific requirements.

---

**Built with ❤️ for the Kenyan WiFi hotspot market**
