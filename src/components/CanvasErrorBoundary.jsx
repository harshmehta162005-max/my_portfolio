import React from 'react';

// ============================================
// CANVAS ERROR BOUNDARY — Catches WebGL crashes
// gracefully so the rest of the 2D UI renders
// ============================================

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('3D Canvas error caught by boundary:', error.message);
  }

  render() {
    if (this.state.hasError) {
      // Graceful fallback — animated gradient background
      return (
        <div className="absolute inset-0 bg-void overflow-hidden">
          {/* Animated gradient orbs as fallback */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(176,38,255,0.3) 0%, transparent 70%)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-[250px] h-[250px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,122,0.3) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite reverse',
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;
