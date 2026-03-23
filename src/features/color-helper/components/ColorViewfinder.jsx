import ColorOverlay from './ColorOverlay';

export default function ColorViewfinder({ videoRef, isReady, isScanning, colors, capturedImage, onReset }) {
  return (
    <div className="relative w-full h-[60vh] bg-black flex items-center justify-center overflow-hidden">

      {/* === MODE KAMERA === */}
      {capturedImage === null && (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover absolute top-0 left-0"
          />

          {/* Loading spinner */}
          {!isReady && (
            <div className="absolute z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-white z-10"></div>
          <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-white z-10"></div>
          <div className="absolute bottom-16 left-8 w-10 h-10 border-b-4 border-l-4 border-white z-10"></div>
          <div className="absolute bottom-16 right-8 w-10 h-10 border-b-4 border-r-4 border-white z-10"></div>

          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-black/50 z-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm font-medium">Menganalisis warna...</p>
            </div>
          )}

          {/* Bottom instruction */}
          <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none">
            <p className="text-white text-sm opacity-50 font-medium">
              Arahkan ke objek, lalu tap Scan Warna
            </p>
          </div>
        </>
      )}

      {/* === MODE HASIL === */}
      {capturedImage !== null && (
        <>
          <img
            src={`data:image/jpeg;base64,${capturedImage}`}
            alt="Captured"
            className="w-full h-full object-cover absolute top-0 left-0"
          />

          {/* Color overlay on top of captured image */}
          <ColorOverlay colors={colors} />

          {/* Badge top-right */}
          {colors.length > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full">
                {colors.length} warna terdeteksi
              </span>
            </div>
          )}

          {/* Reset button top-left */}
          <button
            onClick={onReset}
            className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70 transition-colors"
            style={{ fontSize: '12px' }}
          >
            ← Scan ulang
          </button>
        </>
      )}
    </div>
  );
}
