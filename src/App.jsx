import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

export default function App() {
  return (
    <Routes>







      {/* Ana sayfa: karakter listesi */}
      <Route path="/" element={<Home />} />

      {/* Karakter detay sayfası */}
      <Route path="/character/:id" element={<Detail />} />

      {/* Bilinmeyen rotalarda ana sayfaya yönlendir */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
