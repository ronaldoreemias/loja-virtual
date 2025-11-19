
# iPhone 16 Pro Max E-commerce Platform

A React-based e-commerce application implementing a complete purchase flow for iPhone 16 Pro Max, featuring product selection, checkout process, and payment integration.

## Application Overview

This project demonstrates a modern e-commerce implementation with client-side state management and multi-step purchase workflow. The application maintains data consistency across navigation steps using browser localStorage.

## Technical Stack

- **Frontend Framework**: React 18+
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **State Persistence**: Browser localStorage
- **Build Tool**: Create React App

## Project Architecture
src/
├── App.js # Root component
├── Routes.js # Route configuration
├── components/
│ └── Navbar/ # Navigation component
└── pages/
├── Produto/ # Product selection page
├── Checkout/ # Delivery information page
└── Pagamento/ # Payment processing page

text

## Application Flow

### Product Selection Page (/)
- Product visualization with image gallery
- Color selection (Black Titanium, White Titanium)
- Storage capacity selection (128GB, 256GB, 512GB, 1TB)
- Dynamic price calculation based on configuration
- Add to cart functionality with localStorage persistence

### Checkout Process (/checkout)
- Customer information form validation
- Delivery address collection
- Order summary display
- Required field validation before proceeding

### Payment Processing (/pagamento)
- Multiple payment method support (Credit Card, PIX, Bank Slip)
- Credit card form with field validation
- Payment simulation interface
- Order finalization with data persistence

## Implementation Details

### State Management
- Component-level state for UI interactions
- localStorage for cross-session data persistence
- Route parameters for navigation state

### Data Flow
1. Product configuration stored in localStorage upon selection
2. Customer data persisted during checkout phase
3. Payment information processed in final step
4. Complete order data saved upon completion

### Form Handling
- Controlled components for form inputs
- Real-time validation
- Conditional rendering based on payment method selection

## Development Setup

### Prerequisites
- Node.js 14.0+
- npm 6.0+ or yarn 1.22+

### Installation
bash
git clone [repository-url]
cd [project-directory]
npm install
Development Server
bash
npm start
Application available at http://localhost:3000

Production Build
bash
npm run build
Available Scripts
npm start - Development server with hot reload

npm test - Test runner in interactive watch mode

npm run build - Production build optimization

npm run eject - Configuration exposure (irreversible)

Configuration
Product Specifications
Available colors: Black Titanium, White Titanium

Storage options: 128GB, 256GB, 512GB, 1TB

Pricing matrix defined in Product component

Payment Methods
Credit Card (with form validation)

PIX (simulated QR code generation)

Bank Slip (simulated generation)

Browser Compatibility
Chrome 90+

Firefox 88+

Safari 14+

Edge 90+

Data Persistence Strategy
Product selection: localStorage.setItem('produtoSelecionado')

Checkout data: localStorage.setItem('dadosCompra')

Order completion: localStorage.setItem('compraFinalizada')

Production Considerations
Security
Implement proper input sanitization

Add CSRF protection for form submissions

Secure payment processing integration

Performance
Implement code splitting for route-based chunks

Add image optimization and lazy loading

Enable gzip compression for production build

Scalability
Replace localStorage with backend API integration

Implement proper state management (Redux/Context)

Add service worker for offline functionality

Development Roadmap
Backend API integration for order processing

Payment gateway integration (Stripe, PagSeguro)

User authentication and order history

Inventory management integration

Email notification system

Analytics and tracking implementation

Technical Constraints
Current implementation uses client-side storage only

Payment processing is simulated

No server-side validation

Single product focus (iPhone 16 Pro Max)

License
MIT License - see LICENSE file for details

This implementation serves as a frontend demonstration of e-commerce functionality. Production deployment requires backend services, secure payment processing, and comprehensive testing.