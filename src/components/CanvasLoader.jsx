import { Html, useProgress } from '@react-three/drei';

// ============================================
// CANVAS LOADER — In-canvas 3D loading spinner
// Shown inside R3F Suspense boundaries
// ============================================

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Spinning ring */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 245, 255, 0.1)',
          borderTopColor: '#00F5FF',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p
        style={{
          fontSize: '11px',
          color: '#00F5FF',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.15em',
        }}
      >
        {progress.toFixed(0)}%
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
};

export default CanvasLoader;