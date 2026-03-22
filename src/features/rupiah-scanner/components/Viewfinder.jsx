export default function Viewfinder({ videoRef, isReady, isScanning }) {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline 
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      
      {!isReady && (
        <div className="absolute z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Frame corners */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-white z-10"></div>
      <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-white z-10"></div>
      <div className="absolute bottom-16 left-8 w-10 h-10 border-b-4 border-l-4 border-white z-10"></div>
      <div className="absolute bottom-16 right-8 w-10 h-10 border-b-4 border-r-4 border-white z-10"></div>

      {isScanning && (
        <div className="absolute left-0 w-full h-[3px] bg-white opacity-60 z-20 shadow-[0_0_10px_white] animate-[scan_2s_ease-in-out_infinite]"></div>
      )}

      <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none">
        <p className="text-white text-sm opacity-50 font-medium">Arahkan kamera ke uang</p>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 15%; }
          50% { top: 85%; }
          100% { top: 15%; }
        }
      `}</style>
    </div>
  );
}
