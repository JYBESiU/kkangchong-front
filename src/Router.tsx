import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import FacilitySelect from 'pages/FacilitySelect';
import KakaoMapLayout from 'components/Layout/KakaoMapLayout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="createClub">
          <Route path="map" element={<KakaoMapLayout />}>
            <Route path="facilitySelect" element={<FacilitySelect />} />
          </Route>
          <Route path="clubInfo" />
          <Route path="complete" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
