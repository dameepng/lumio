export default function ColorOverlay({ result }) {
  if (!result) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Bottom gradient info panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))',
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Color swatch */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: result.hex,
            border: '2px solid rgba(255,255,255,0.3)',
            flexShrink: 0,
          }}
        />

        {/* Text info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {result.object}
          </span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 500,
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {result.nameId}
          </span>
          <span
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {result.nameEn}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}
          >
            {result.hex}
          </span>
        </div>
      </div>
    </div>
  );
}
