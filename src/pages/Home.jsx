import FeatureCard from '../core/components/FeatureCard';

export default function Home() {
  const features = [
    {
      icon: "💵",
      title: "Rupiah Scanner",
      description: "Identifikasi nominal uang rupiah",
      href: "/rupiah-scanner",
      available: true
    },
    {
      icon: "🎨",
      title: "Color Helper",
      description: "Bantu buta warna kenali warna",
      href: "/color-helper",
      available: true
    },
    {
      icon: "🔤",
      title: "Text Reader",
      description: "Baca teks dari gambar",
      href: "/text-reader",
      available: false
    },
    {
      icon: "📏",
      title: "Distance Guide",
      description: "Estimasi jarak objek di sekitar",
      href: "/distance-guide",
      available: false
    }
  ];

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Lumio</h1>
        <p className="text-gray-400 text-lg">Teknologi untuk semua</p>
      </header>
      
      <main className="flex-1">
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>Lumio — made with ❤️ for accessibility</p>
      </footer>
    </div>
  );
}
