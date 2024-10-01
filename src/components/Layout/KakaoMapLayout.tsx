import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

import KakaoMap from 'components/KakaoMap';

function KakaoMapLayout() {
  return (
    <Flex>
      <LeftPanel>
        <Outlet />
      </LeftPanel>
      <KakaoMap />
    </Flex>
  );
}

export default KakaoMapLayout;

const Flex = styled.div`
  display: flex;
`;

const LeftPanel = styled.div`
  width: 670px;
  height: 100vh;
  background: white;
`;
