# Project Troubleshooting Guide

This document catalogs significant issues encountered during the development of the Nimbus Keyboards project and their corresponding solutions. This serves as a knowledge base for future reference and team onboarding.

## Table of Contents

1. [3D Model Integration Issues](#3d-model-integration-issues)
2. [Responsive Design Challenges](#responsive-design-challenges)
3. [Audio Implementation Problems](#audio-implementation-problems)
4. [React Three Fiber Integration](#react-three-fiber-integration)
5. [Performance Optimization Issues](#performance-optimization-issues)

## 3D Model Integration Issues

### 1. GLTF Model Loading Failures

**Error:**
```
TypeError: Cannot read properties of undefined (reading 'scene')
```

**Cause:**
- Incorrect model file path
- Model loading before Three.js context initialization
- Unsupported model format or corrupted files

**Solution:**
- Implement proper error boundaries for 3D components
- Use React Suspense for model loading
- Ensure correct file paths in public directory
```tsx
<Suspense fallback={<Loader />}>
  <Model />
</Suspense>
```

### 2. Texture UV Mapping Issues

**Error:**
Material display inconsistencies and texture mapping errors

**Cause:**
- Incorrect UV unwrapping in 3D models
- Missing or incorrectly referenced texture files
- Wrong texture format support

**Solution:**
- Standardize texture file formats to .png or .jpg
- Implement proper UV mapping in 3D modeling software
- Use texture compression for better performance
```tsx
useTexture.preload([
  '/textures/keyboard_diffuse.png',
  '/textures/keyboard_normal.png'
]);
```

## Responsive Design Challenges

### 1. Mobile Viewport Issues

**Error:**
Content overflow and incorrect viewport heights on mobile devices

**Cause:**
- Inconsistent viewport height handling across devices
- CSS vh unit limitations on mobile browsers

**Solution:**
- Implement dynamic viewport height calculations
- Use modern viewport units (dvh, svh, lvh)
```css
.hero-section {
  height: 100dvh;
  /* Fallback for older browsers */
  height: calc(var(--vh, 1vh) * 100);
}
```

### 2. 3D Model Responsiveness

**Error:**
Models appearing distorted or incorrectly sized on different screen sizes

**Cause:**
- Fixed camera positions
- Lack of responsive scaling
- Incorrect aspect ratio handling

**Solution:**
- Implement dynamic camera adjustments
- Use responsive scaling factors
```tsx
const scale = useAspect(
  window.innerWidth,
  window.innerHeight,
  1
);

return (
  <group scale={[scale, scale, scale]}>
    <Model />
  </group>
);
```

## Audio Implementation Problems

### 1. Audio Context Initialization

**Error:**
```
DOMException: play() failed because the user didn't interact with the document first
```

**Cause:**
- Browser autoplay policies
- Audio context not initialized on user interaction
- Missing audio files or incorrect paths

**Solution:**
- Initialize audio only after user interaction
- Implement proper audio loading states
- Add fallback for missing audio files
```tsx
const initializeAudio = () => {
  const audio = new Audio();
  audio.src = audioFile;
  return new Promise((resolve) => {
    audio.addEventListener('canplaythrough', () => resolve(audio));
  });
};
```

### 2. Audio State Management

**Error:**
Audio state inconsistencies across component lifecycle

**Cause:**
- Improper cleanup of audio resources
- Race conditions in audio loading
- Memory leaks from unmanaged audio instances

**Solution:**
- Implement proper cleanup in useEffect
- Use proper state management for audio instances
```tsx
useEffect(() => {
  return () => {
    audioInstances.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
  };
}, []);
```

## React Three Fiber Integration

### 1. Canvas Context Issues

**Error:**
```
Error: Canvas3D can only be rendered inside a React Three Fiber Canvas
```

**Cause:**
- Components rendered outside Canvas context
- Incorrect component hierarchy
- Missing provider components

**Solution:**
- Ensure proper component hierarchy
- Implement context providers correctly
```tsx
<Canvas>
  <React.Suspense fallback={null}>
    <Scene />
  </React.Suspense>
</Canvas>
```

### 2. Performance Degradation

**Error:**
Low FPS and stuttering animations

**Cause:**
- Unnecessary re-renders
- Heavy computations in render loop
- Unoptimized 3D models

**Solution:**
- Implement proper memoization
- Use instancing for repeated geometries
- Optimize render loop calculations
```tsx
const MemoizedModel = React.memo(({ geometry }) => (
  <instancedMesh args={[geometry, null, 1000]}>
    <meshStandardMaterial />
  </instancedMesh>
));
```

## Performance Optimization Issues

### 1. Memory Leaks

**Error:**
Increasing memory usage over time

**Cause:**
- Unmanaged event listeners
- Uncleaned animations
- Retained 3D resources

**Solution:**
- Implement proper cleanup
- Dispose of unused resources
- Use proper memory management patterns
```tsx
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  
  return () => {
    geometry.dispose();
    materials.forEach(material => material.dispose());
  };
}, []);
```

### 2. Initial Load Performance

**Error:**
Slow initial page load and high bundle size

**Cause:**
- Large 3D model files
- Unoptimized asset loading
- Non-chunked JavaScript bundles

**Solution:**
- Implement proper code splitting
- Use dynamic imports for heavy components
- Optimize asset loading strategy
```tsx
const Model = dynamic(() => import('@/components/Model'), {
  ssr: false,
  loading: () => <Loader />
});
```

## Additional Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Next.js Performance Documentation](https://nextjs.org/docs/advanced-features/performance)

## Contributing

When adding new issues to this document:

1. Clearly describe the error with any relevant error messages
2. Explain the root cause of the issue
3. Provide a detailed solution with code examples
4. Add any relevant references or documentation links
5. Keep the formatting consistent with the existing entries

---

This document is continuously updated as new issues are discovered and resolved.