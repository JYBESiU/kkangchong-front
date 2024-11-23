import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import MeasuringPage from 'pages/MeasuringPage';
import ClubsPage from 'pages/ClubsPage';
import ResultPage from 'pages/ResultPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="measuring" element={<MeasuringPage />} />
        <Route path="clubs" element={<ClubsPage />} />
        <Route path="result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
