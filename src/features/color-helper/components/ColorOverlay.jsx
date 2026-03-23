const AREA_MAP = {
  'kiri atas':   { top: '5%', left: '5%', width: '38%', height: '38%' },
  'kanan atas':  { top: '5%', right: '5%', width: '38%', height: '38%' },
  'tengah':      { top: '30%', left: '25%', width: '50%', height: '38%' },
  'kiri bawah':  { top: '57%', left: '5%', width: '38%', height: '38%' },
  'kanan bawah': { top: '57%', right: '5%', width: '38%', height: '38%' },
};

export default function ColorOverlay({ colors }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {colors.map((color, idx) => {
        const pos = AREA_MAP[color.area] || AREA_MAP['tengah'];
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              ...pos,
              border: `2px solid ${color.hex}`,
              borderRadius: '4px',
            }}
          >
            {/* Label above box */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translateY(-100%)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(0,0,0,0.8)',
                padding: '2px 6px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: '1px solid white',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                {color.nameId}
              </span>
              <span style={{ fontSize: '10px', color: 'white', opacity: 0.6 }}>
                ({color.nameEn})
              </span>
              <span style={{ fontSize: '10px', color: 'white', opacity: 0.75 }}>
                {color.percentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
