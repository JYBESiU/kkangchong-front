import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import MeasuringPage from 'pages/MeasuringPage';
import ClubsPage from 'pages/ClubsPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="measuring" element={<MeasuringPage />} />
        <Route path="clubs" element={<ClubsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
