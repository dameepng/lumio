import { Routes, Route } from 'react-router-dom';
import AppShell from './core/components/AppShell';
import Home from './pages/Home';
import RupiahScanner from './features/rupiah-scanner/RupiahScanner';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rupiah-scanner" element={<RupiahScanner />} />
      </Routes>
    </AppShell>
  );
}

export default App;
