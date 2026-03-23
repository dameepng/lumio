import ColorOverlay from './ColorOverlay';

export default function ColorViewfinder({ videoRef, isReady, isScanning, colors }) {
  return (
    <div className="relative w-full h-[60vh] bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/* Color overlay on top of video */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <ColorOverlay colors={colors} />
      </div>

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

      {/* Badge top-right */}
      <div className="absolute top-4 right-4 z-10">
        {isScanning ? (
          <span className="text-white opacity-70 text-sm bg-black/40 px-3 py-1 rounded-full">
            Mendeteksi...
          </span>
        ) : colors.length > 0 ? (
          <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full">
            {colors.length} warna terdeteksi
          </span>
        ) : null}
      </div>

      {/* Bottom instruction text */}
      <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none">
        <p className="text-white text-sm opacity-50 font-medium">
          Arahkan ke objek untuk deteksi warna otomatis
        </p>
      </div>
    </div>
  );
}
