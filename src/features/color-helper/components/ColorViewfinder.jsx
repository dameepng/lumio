import ColorOverlay from './ColorOverlay';

export default function ColorViewfinder({ videoRef, isReady, isScanning, result, capturedImage, onReset }) {
  const cornerStyle = (top, left, bottom, right) => ({
    position: 'absolute',
    width: '24px',
    height: '24px',
    borderColor: 'rgba(255,255,255,0.7)',
    borderStyle: 'solid',
    borderWidth: 0,
    ...(top !== undefined && { top, borderTopWidth: '3px' }),
    ...(bottom !== undefined && { bottom, borderBottomWidth: '3px' }),
    ...(left !== undefined && { left, borderLeftWidth: '3px' }),
    ...(right !== undefined && { right, borderRightWidth: '3px' }),
    borderRadius: top !== undefined && left !== undefined ? '8px 0 0 0'
      : top !== undefined && right !== undefined ? '0 8px 0 0'
      : bottom !== undefined && left !== undefined ? '0 0 0 8px'
      : '0 0 8px 0',
  });

  const scanningOverlay = isScanning && (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '4px solid white',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ color: '#fff', fontSize: '14px', opacity: 0.7 }}>Menganalisis...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // MODE HASIL
  if (capturedImage) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '60vh',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <img
          src={`data:image/jpeg;base64,${capturedImage}`}
          alt="Captured"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <ColorOverlay result={result} />
        {scanningOverlay}
        <button
          onClick={onReset}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: '12px',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← Scan ulang
        </button>
      </div>
    );
  }

  // MODE KAMERA
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '60vh',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Corner brackets */}
      <div style={cornerStyle(16, 16)} />
      <div style={cornerStyle(16, undefined, undefined, 16)} />
      <div style={cornerStyle(undefined, 16, 16)} />
      <div style={cornerStyle(undefined, undefined, 16, 16)} />

      {scanningOverlay}

      <span
        style={{
          position: 'absolute',
          bottom: '16px',
          width: '100%',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
        }}
      >
        Foto objek untuk kenali warnanya
      </span>
    </div>
  );
}
