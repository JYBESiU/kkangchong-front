import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import MeasuringPage from 'pages/MeasuringPage';
import ClubsPage from 'pages/ClubsPage';
import ResultPage from 'pages/ResultPage';
import { MeasurementProvider } from 'components/MeasurementContext';
import NavigationLayout from 'pages/NavigationLayout';
import RecordStartPage from 'pages/RecordStartPage';
import RecordPage from 'pages/RecordPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="record-start" element={<RecordStartPage />} />
        </Route>

        <Route
          path="measuring"
          element={
            <MeasurementProvider>
              <MeasuringPage />
            </MeasurementProvider>
          }
        />
        <Route path="result" element={<ResultPage />} />
        <Route path="record" element={<RecordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
