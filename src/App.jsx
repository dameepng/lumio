import { Routes, Route } from 'react-router-dom';
import AppShell from './core/components/AppShell';
import Home from './pages/Home';
import RupiahScanner from './features/rupiah-scanner/RupiahScanner';
import ColorHelper from './features/color-helper/ColorHelper';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rupiah-scanner" element={<RupiahScanner />} />
        <Route path="/color-helper" element={<ColorHelper />} />
      </Routes>
    </AppShell>
  );
}

export default App;
