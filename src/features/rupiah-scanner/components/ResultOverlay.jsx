export default function ResultOverlay({ nominal, label, confidence, onDismiss, visible }) {
  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)] transition-opacity duration-300 pointer-events-auto cursor-pointer"
      onClick={onDismiss}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-sm w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-[56px] w-[56px] text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        
        <h2 className="text-[40px] font-bold text-white leading-none mb-3">{nominal}</h2>
        <p className="text-[18px] text-white opacity-70 mb-6">{label}</p>
        
        {confidence === 'low' && (
          <div className="bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-full border border-yellow-600/50">
            Kurang yakin, coba lagi
          </div>
        )}
      </div>
    </div>
  );
}
