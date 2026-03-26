import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorDetection } from './hooks/useColorDetection';
import ColorViewfinder from './components/ColorViewfinder';

export default function ColorHelper() {
  const navigate = useNavigate();
  const { videoRef, isReady, result, isScanning, capturedImage, scanColors, resetScan } = useColorDetection();

  // Cleanup speech on unmount
  useEffect(() => {
    return () => speechSynthesis.cancel();
  }, []);

  // Audio feedback
  useEffect(() => {
    if (!result) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(result.description);
    utt.lang = 'id-ID';
    utt.rate = 0.9;
    speechSynthesis.speak(utt);
  }, [result]);

  const handleScan = () => {
    if (capturedImage) resetScan();
    scanColors();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh',
                  maxWidth: '448px', margin: '0 auto', background: '#000',
                  color: '#fff', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px',
                    height: '64px', flexShrink: 0, background: '#0a0a0a' }}>
        <button onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
                   cursor: 'pointer', padding: '8px', marginLeft: '-8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontWeight: 'bold',
                     fontSize: '18px', marginRight: '32px' }}>Color Helper</h1>
      </div>

      {/* Viewfinder */}
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
        <ColorViewfinder
          videoRef={videoRef}
          isReady={isReady}
          isScanning={isScanning}
          result={result}
          capturedImage={capturedImage}
          onReset={resetScan}
        />
      </div>

      {/* Bottom Panel */}
      <div style={{ background: '#111', padding: '24px', flexShrink: 0 }}>
        <button
          onClick={handleScan}
          disabled={!isReady || isScanning}
          style={{
            width: '100%', height: '72px', borderRadius: '16px',
            background: isScanning ? '#333' : '#fff',
            color: isScanning ? '#fff' : '#000',
            border: 'none', fontSize: '18px', fontWeight: '500',
            cursor: isReady && !isScanning ? 'pointer' : 'not-allowed',
            opacity: !isReady ? 0.5 : 1,
            transition: 'all 0.2s'
          }}>
          {isScanning ? 'Menganalisis...' : capturedImage ? 'Scan Ulang' : 'Scan Warna'}
        </button>
      </div>
    </div>
  );
}
