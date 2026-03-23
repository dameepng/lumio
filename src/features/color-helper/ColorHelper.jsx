import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorDetection } from './hooks/useColorDetection';
import ColorViewfinder from './components/ColorViewfinder';

function getBrightness(hex) {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default function ColorHelper() {
  const navigate = useNavigate();
  const { videoRef, isReady, colors, isScanning, capturedImage, scanColors, resetScan } = useColorDetection();

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Audio feedback via Web Speech API
  useEffect(() => {
    if (colors.length === 0) return;

    const text = 'Terdeteksi: ' + colors.map(c => c.nameId).join(', ');
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'id-ID';
    utt.rate = 0.9;
    speechSynthesis.speak(utt);
  }, [colors]);

  const handleScan = () => {
    if (capturedImage) {
      resetScan();
      // Small delay to let camera re-render before capturing
      setTimeout(() => scanColors(), 300);
    } else {
      scanColors();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center px-4 h-16 shrink-0 bg-[#0a0a0a] z-10 relative">
        <button
          onClick={() => navigate('/')}
          className="p-2 -ml-2 text-white/80 hover:text-white"
          aria-label="Kembali ke Beranda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg mr-6">Color Helper</h1>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 w-full relative">
        <ColorViewfinder
          videoRef={videoRef}
          isReady={isReady}
          isScanning={isScanning}
          colors={colors}
          capturedImage={capturedImage}
          onReset={resetScan}
        />
      </div>

      {/* Bottom Panel */}
      <div className="bg-[#111] p-6 shrink-0 z-30 relative">
        {/* Main button */}
        <button
          onClick={handleScan}
          disabled={isScanning || !isReady}
          className="w-full h-[72px] rounded-2xl bg-white text-black text-[18px] font-medium disabled:opacity-50 transition-opacity active:opacity-80"
        >
          {isScanning ? 'Menganalisis...' : capturedImage ? 'Scan Ulang' : 'Scan Warna'}
        </button>

        {/* Color pills */}
        {colors.length > 0 && (
          <div className="mt-4 flex flex-row flex-wrap gap-2">
            {colors.map((color, idx) => {
              const brightness = getBrightness(color.hex);
              const textColor = brightness > 128 ? '#000000' : '#ffffff';
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: color.hex, color: textColor }}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-current shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.nameId} ({color.nameEn})</span>
                  <span className="opacity-75">{color.percentage}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
