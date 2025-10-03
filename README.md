# Nimbus Keyboards - Interactive 3D Keyboard Experience

A web application showcasing mechanical keyboards through immersive 3D experiences, built with Next.js 14, Three.js, and Prismic CMS.

## 🚀 Features

- **Interactive 3D Visualization**: Real-time 3D keyboard models with customizable views
- **Responsive Design**: Fully responsive layouts across all devices
- **Dynamic Content Management**: Prismic CMS integration for content updates
- **Performant Animations**: GSAP-powered smooth animations and transitions
- **Immersive Audio**: Switch sound samples for authentic mechanical keyboard experience
- **Advanced 3D Controls**: Camera controls and lighting adjustments

## 🛠 Technical Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: TailwindCSS + PostCSS
- **Animation**: GSAP with ScrollTrigger
- **State Management**: React Hooks + Context
- **TypeScript**: Full type safety across the application

### CMS & Content
- **Prismic**: Headless CMS with custom slices
- **Slice Machine**: Local slice development
- **Custom Types**: Structured content models

## 📦 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── Bounded.tsx    # Layout component
│   ├── FadeIn.tsx     # Animation component
│   ├── Keyboard.tsx   # 3D keyboard component
│   └── Keycap.tsx     # 3D keycap component
├── slices/            # Prismic slice components
│   ├── Heroo/         # Hero section with 3D model
│   ├── ColorChanger/  # Color customization
│   └── BentoBox/      # Layout component
└── prismicio.ts       # Prismic configuration

public/
├── models/            # 3D model assets
├── sounds/           # Keyboard sound effects
└── hdr/             # HDR environment maps
```

## 🎨 Key Components

### Hero Section (`Heroo`)

- Responsive layout with dynamic text scaling
- 3D model integration with real-time lighting
- GSAP-powered animations and transitions
- Scroll-triggered color transitions
- Mobile-optimized viewing angles and positioning
- Interactive elements and hover states
- Dynamic content management through Prismic

### Interactive Elements

- Real-time color customization of keyboard components
- Switch sound playback for authentic feedback
- Dynamic lighting adjustments with HDR support
- Responsive camera controls and positioning
- Performance-optimized 3D rendering
- Touch-friendly mobile interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Tweenwrld/perfume-website.git
cd perfume-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-secret-key
```

### Prismic Setup

1. Create a Prismic repository
2. Configure the custom types provided in `customtypes/`
3. Set up preview functionality using the provided endpoints
4. Configure your webhook settings for automatic revalidation

## 📱 Responsive Design

The application implements a comprehensive responsive design strategy:

### Breakpoints

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large screens: 1440px+

### Key Responsive Features

- Dynamic text scaling using TailwindCSS
- Adaptive layouts for different screen sizes
- Mobile-optimized 3D model viewing angles
- Touch-friendly controls for mobile interaction
- Optimized performance across devices

## 🎭 Animation System

The application uses GSAP for sophisticated animations:

### Implementation Details

- Scroll-triggered animations for seamless transitions
- Text reveal effects with SplitText
- Color transitions with linear interpolation
- Model interaction animations
- Loading state animations

## 🎮 3D Interaction Features

### Model Management

- Real-time model manipulation using Three.js
- Custom shader materials for realistic rendering
- Environment mapping for realistic reflections
- Dynamic lighting system with HDR support
- Performance-optimized geometry and textures

### Interactive Features

- Color customization with real-time updates
- Camera position controls
- Switch sound integration
- Touch and mouse interaction support
- Loading state management

## 📈 Performance Optimizations

### Asset Loading

- Lazy loading of 3D models
- Compressed textures using modern formats
- Optimized geometry with Draco compression
- Progressive loading of high-resolution assets

### Runtime Optimization

- Efficient animation system using GSAP
- Code splitting for optimal chunk sizes
- Proper asset caching strategies
- Memory management for 3D scenes
- Mobile-specific optimizations

## 🔨 Development Workflow

### 1. Content Management

The project uses Prismic CMS for content management. To work with content:

1. Start Slice Machine for local development:

```bash
npm run slicemachine
```

2. Create and edit slices in the Slice Machine UI
3. Sync changes with your Prismic repository
4. Test changes using the preview functionality

### 2. Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Create production build
npm run start        # Start production server

# Quality Assurance
npm run lint         # Run ESLint checks

# CMS Development
npm run slicemachine # Start Slice Machine UI
```

## 🚀 Deployment

### Vercel Deployment

This project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy with zero configuration

### Other Platforms

For other platforms, ensure:

1. Node.js 18+ support
2. Serverless functions capability
3. Environment variable configuration
4. Proper build command setup

### CI/CD Configuration

- Configure caching for `node_modules`
- Set up build output caching
- Configure environment variables
- Set up preview deployments

## 🔧 Troubleshooting

### Common Issues

1. **Development Server Issues**
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Clear `.next` directory and rebuild

2. **Prismic Preview Problems**
   - Verify environment variables
   - Check preview route configuration
   - Validate Prismic webhook setup

3. **Performance Issues**
   - Optimize 3D model file sizes
   - Use Draco compression for GLTF files
   - Implement proper asset loading strategies
   - Consider using a CDN for large assets

## 🔮 Future Improvements

### Planned Features

1. **Enhanced Interactivity**
   - More keyboard customization options
   - Additional switch types and sounds
   - Advanced lighting presets

2. **Performance Optimizations**
   - Implement WebAssembly for heavy computations
   - Add progressive loading for models
   - Optimize mobile performance further

3. **User Experience**
   - Add more animation variations
   - Improve touch controls
   - Enhance accessibility features

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


