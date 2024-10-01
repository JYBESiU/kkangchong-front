import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import {
  FacilitySelect,
  FacilityList,
  FacilityInfo,
  FacilityReserve,
  ClubInfo,
  ClubComplete,
  KakaoMapLayout,
} from 'pages/createClub';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="createClub">
          <Route path="map" element={<KakaoMapLayout />}>
            <Route path="facilitySelect" element={<FacilitySelect />} />
            <Route path="facilityList" element={<FacilityList />} />
            <Route path="facilityInfo" element={<FacilityInfo />} />
            <Route path="facilityReserve" element={<FacilityReserve />} />
          </Route>
          <Route path="clubInfo" element={<ClubInfo />} />
          <Route path="complete" element={<ClubComplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
