import { Link } from 'react-router-dom';

export default function FeatureCard({ icon, title, description, href, available }) {
  const CardContent = () => (
    <div 
      className={`bg-[#1a1a1a] rounded-2xl p-5 h-full flex flex-col justify-between ${!available ? 'opacity-50' : ''}`}
    >
      <div>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      {!available && (
        <div className="mt-4">
          <span className="bg-gray-800 text-xs px-2 py-1 rounded-full text-gray-300">Segera hadir</span>
        </div>
      )}
    </div>
  );

  if (available) {
    return (
      <Link 
        to={href} 
        className="block h-full transition-transform hover:scale-105 active:scale-95"
        role="button" 
        aria-label={title}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div 
      className="block h-full cursor-not-allowed"
      role="button" 
      aria-label={title}
    >
      <CardContent />
    </div>
  );
}
