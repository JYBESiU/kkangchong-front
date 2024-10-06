import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import {
  FacilitySelectPage,
  FacilityListPage,
  FacilityInfoPage,
  FacilityReservePage,
  ClubInfoPage,
  ClubCompletePage,
  KakaoMapLayout,
} from 'pages/createClub';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="createClub">
          <Route path="map" element={<KakaoMapLayout />}>
            <Route path="facilitySelect" element={<FacilitySelectPage />} />
            <Route path="facilityList" element={<FacilityListPage />} />
            <Route path="facilityInfo" element={<FacilityInfoPage />} />
            <Route path="facilityReserve" element={<FacilityReservePage />} />
          </Route>
          <Route path="clubInfo" element={<ClubInfoPage />} />
          <Route path="complete" element={<ClubCompletePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
