import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Viewfinder from './components/Viewfinder';
import ResultOverlay from './components/ResultOverlay';
import { useCamera } from './hooks/useCamera';
import { useAudio } from './hooks/useAudio';
import { classifyRupiah } from './lib/classifyRupiah';

export default function RupiahScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const { videoRef, isReady, captureFrame } = useCamera();
  const { play } = useAudio();

  const handleScan = async () => {
    setIsScanning(true);
    play('memindai');

    const base64 = captureFrame();
    if (!base64) {
      setIsScanning(false);
      return;
    }

    try {
      const { nominal, confidence } = await classifyRupiah(base64);

      let mappingLabel = '';
      let mappingNominal = '';

      switch (nominal) {
        case 'seribu':          mappingNominal = 'Rp 1.000'; mappingLabel = 'Seribu rupiah'; break;
        case 'dua-ribu':        mappingNominal = 'Rp 2.000'; mappingLabel = 'Dua ribu rupiah'; break;
        case 'lima-ribu':       mappingNominal = 'Rp 5.000'; mappingLabel = 'Lima ribu rupiah'; break;
        case 'sepuluh-ribu':    mappingNominal = 'Rp 10.000'; mappingLabel = 'Sepuluh ribu rupiah'; break;
        case 'dua-puluh-ribu':  mappingNominal = 'Rp 20.000'; mappingLabel = 'Dua puluh ribu rupiah'; break;
        case 'lima-puluh-ribu': mappingNominal = 'Rp 50.000'; mappingLabel = 'Lima puluh ribu rupiah'; break;
        case 'seratus-ribu':    mappingNominal = 'Rp 100.000'; mappingLabel = 'Seratus ribu rupiah'; break;
        case 'tidak-terdeteksi':
        default:
          mappingNominal = 'Tidak terdeteksi';
          mappingLabel = 'Coba lagi';
          break;
      }

      setResult({
        nominal: mappingNominal,
        label: mappingLabel,
        confidence,
        rawNominalKey: nominal
      });

      play(nominal);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      play('gagal');
    } finally {
      setIsScanning(false);
    }
  };

  const handleDismiss = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white overflow-hidden relative">
      {/* Header bar */}
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
        <h1 className="flex-1 text-center font-bold text-lg mr-6">Rupiah Scanner</h1>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 w-full relative">
        <Viewfinder videoRef={videoRef} isReady={isReady} isScanning={isScanning} />
      </div>

      {/* Bottom panel */}
      <div className="bg-[#111] p-6 shrink-0 z-30 relative">
        <button
          onClick={handleScan}
          disabled={isScanning || !isReady}
          className="w-full h-[72px] rounded-2xl bg-white text-black text-[18px] font-medium disabled:opacity-50 transition-opacity active:opacity-80 flex items-center justify-center"
        >
          {isScanning ? "Memindai..." : "Scan Uang"}
        </button>
        <p className="text-white opacity-40 text-[12px] text-center mt-3">
          Pastikan uang terlihat jelas dan cahaya cukup
        </p>
      </div>

      {/* Result Overlay */}
      <ResultOverlay 
        visible={showResult}
        nominal={result?.nominal}
        label={result?.label}
        confidence={result?.confidence}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
