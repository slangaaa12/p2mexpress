# P2M Express Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium e-commerce platforms (ASOS, Zara) combined with modern service marketplaces (Uber, Airbnb) to create a trustworthy, elegant shopping concierge experience.

## Core Design Principles
1. **Trust & Transparency**: Clear pricing, simple processes, professional aesthetic
2. **Effortless Navigation**: Large touch targets, intuitive flow, accessible for ages 18-65+
3. **Premium Yet Approachable**: Sophisticated without being intimidating

## Typography
- **Primary Font**: Inter or Poppins (Google Fonts)
- **Headings**: 600-700 weight, sizes from text-2xl to text-5xl
- **Body Text**: 400 weight, text-base to text-lg for readability
- **Accent Text** (pricing, CTAs): 600-700 weight, slightly larger sizing

## Layout System
- **Spacing Units**: Primarily use 4, 6, 8, 12, 16, 20, 24 (p-4, m-6, gap-8, py-12, px-16, py-20, py-24)
- **Container**: max-w-7xl for content sections
- **Grid System**: grid-cols-2 md:grid-cols-3 lg:grid-cols-5 for store logos, grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for promotion cards

## Component Library

### Hero Section
- **Full-width banner** (not 100vh - natural height around 70vh)
- Elegant gradient background (beige to soft gold tones)
- Large headline with slogan centered
- Pricing badge prominent (1400 MT/kg, 5 dias úteis)
- Animated partner store logos in a horizontal scrolling carousel below headline
- Primary CTA button: "Começar Agora" linking to WhatsApp

### How It Works Section
- **6-step visual process** using numbered cards (1-6)
- Icon for each step (shopping cart, link, WhatsApp, calculator, payment, delivery truck)
- Cards arranged in 2x3 grid on desktop, single column on mobile
- Connecting dotted lines between steps on desktop
- Each card: Icon (top), bold number, title, brief description

### Store Gallery
- **10 store cards** in responsive grid
- Each card: Store logo (centered), store name, "Visitar Loja" button
- Hover effect: Subtle lift (shadow-lg), slight scale (scale-105)
- Cards have soft rounded corners (rounded-xl) with white background
- Direct links to official store websites

### Promotions Section
- **Dynamic promotional cards** showcasing discounts
- Each card: Store logo, discount percentage (large text), valid date, countdown indicator
- Staggered layout (masonry-style) for visual interest
- Highlight badges for best deals (50%+ OFF)
- Cards with gradient borders for high-value promotions

### Floating WhatsApp Button
- **Fixed bottom-right position** (bottom-6 right-6)
- Green circular button (bg-green-500) with WhatsApp icon
- Pulse animation to draw attention
- Click opens WhatsApp with pre-filled message: "Olá, gostaria de fazer uma encomenda de Portugal para Moçambique."

### FAQ Section
- **Accordion-style** expandable questions
- 5-7 key questions with detailed answers
- Plus/minus icons for expand/collapse
- Smooth height transitions
- Questions: Calculate price, delivery time, multiple items, cosmetics, payment confirmation

### About Section
- **Split layout**: Text content + trust indicators
- Mission statement, values (confiança, segurança, rapidez)
- Trust badges or statistics (delivery success rate, customer count)
- Soft background to differentiate from other sections

### Footer
- **Comprehensive footer** with contact info, social links
- Newsletter signup (optional growth mechanism)
- Payment methods accepted
- Copyright and legal links

## Visual Enhancements
- **Micro-interactions**: Button hover states, card lifts, icon animations
- **Smooth Scrolling**: Implement smooth scroll behavior for anchor links
- **Loading States**: Skeleton screens for dynamic content
- **Responsive Images**: All logos and graphics optimized for retina displays

## Images
- **Hero Background**: Soft gradient overlay on image showing Portuguese and Mozambican cultural elements (no specific photo needed, can use gradient)
- **Store Logos**: Official brand logos from Zara, Stradivarius, Bershka, Mango, Pull&Bear, Primark, Kiko Milano, H&M, ASOS, Weekday
- **Icons**: Use Heroicons for process steps, FAQ, and UI elements
- **No large hero image required** - gradient background with logo carousel is sufficient

## Accessibility
- High contrast ratios for text
- Focus states on all interactive elements
- Alt text for all logos and images
- Keyboard navigation support
- ARIA labels for screen readers