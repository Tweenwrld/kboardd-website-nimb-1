# Troubleshooting Guide

This document contains solutions to common issues encountered during development and their resolutions.

## Table of Contents
1. [Image Quality Configuration in Next.js](#image-quality-configuration)
2. [Stripe Checkout Integration Issues](#stripe-checkout-integration)
3. [React Hook Dependencies](#react-hook-dependencies)
4. [Route Handler Type Issues](#route-handler-type-issues)

## Image Quality Configuration
### Problem
```
Warning: Image with src "..." is using quality "96" which is not configured in images.qualities. 
This config will be required starting in Next.js 16.
```

### Analysis
- Next.js 16 introduces stricter image quality configurations
- The warning indicates that we're using image quality values that aren't explicitly configured
- This could lead to undefined behavior in future versions

### Solution
Updated `next.config.ts` to include explicit quality configurations:
```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 96],
  },
};
```

### Implementation Details
- Added support for modern image formats (AVIF, WebP)
- Included commonly used quality values
- Ensures consistent image optimization across the application

## Stripe Checkout Integration
### Problem
```
POST http://localhost:3000/api/checkout/vapor75 500 (Internal Server Error)
Purchase Failed: Error: HTTP error! status: 500
```

### Analysis
Multiple issues were identified:
1. Missing environment variable validation
2. Incorrect price formatting for Stripe
3. Inadequate error handling for missing products
4. Type mismatches in the route handler

### Solution
Implemented comprehensive fixes in the checkout route handler:

1. Environment Variable Validation:
```typescript
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
```

2. Price Formatting:
```typescript
const price = Math.round((product.data.price as number) * 100); // Convert to cents
```

3. Enhanced Error Handling:
```typescript
if (!product) {
  return NextResponse.json(
    { error: "Product not found" },
    { status: 404 },
  );
}

if (!product.data.name || !product.data.price) {
  return NextResponse.json(
    { error: "Invalid product data" },
    { status: 400 },
  );
}
```

4. Improved Origin URL Handling:
```typescript
const origin = request.headers.get("origin") || request.nextUrl.origin;
```

### Implementation Details
- Added robust error checking and validation
- Ensured proper price conversion for Stripe (cents)
- Improved user feedback for various error conditions
- Enhanced type safety and error handling
- Added fallback for origin URL determination

## React Hook Dependencies
### Problem
```
Warning: React Hook useEffect has missing dependencies: 'currentTrack' and 'isPlaying'.
Either include them or remove the dependency array.
```

### Analysis
- React's useEffect hook wasn't properly tracking all its dependencies
- Could lead to stale closures and unexpected behavior
- Potential race conditions in audio playback

### Solution
1. Stored refs safely for cleanup:
```typescript
const currentRefs = { ...audioRefs.current };
```

2. Properly managed cleanup:
```typescript
return () => {
  observer.disconnect();
  Object.values(currentRefs).forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.src = '';
    }
  });
};
```

### Implementation Details
- Ensured proper cleanup of audio resources
- Prevented memory leaks
- Improved state management in effects
- Enhanced component lifecycle handling

## Route Handler Type Issues
### Problem
```
Type error: Type 'typeof import("...route")' does not satisfy the constraint 'RouteHandlerConfig<"/api/checkout/[uid]">'.
Types of property 'POST' are incompatible.
```

### Analysis
- Next.js route handlers have specific type requirements for dynamic routes
- The params object needs to handle Promise-based parameters
- Type mismatch between handler implementation and Next.js expectations

### Solution
Updated the route handler signature to match Next.js requirements:
```typescript
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ uid: string }> },
) {
  const { uid } = await context.params;
  // ... rest of the implementation
}
```

### Implementation Details
- Aligned with Next.js type system requirements
- Properly handled asynchronous parameter resolution
- Maintained type safety throughout the request handling process
- Ensured compatibility with Next.js routing system

## Best Practices Established
1. Always validate environment variables before usage
2. Convert currency values to cents for Stripe
3. Implement comprehensive error handling
4. Properly type async route handlers
5. Manage React hook dependencies carefully
6. Handle cleanup in useEffect hooks
7. Configure Next.js features explicitly
8. Use proper typing for route parameters