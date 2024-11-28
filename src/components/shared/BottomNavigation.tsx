import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from 'utils/color';
import { HomeIcon, ClubIcon, RecordIcon, UserIcon } from 'components/icons';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 393px;
  height: 56px;
  background-color: white;
`;

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
  font-size: 12px;
  padding: 8px 0;
  color: ${({ active }) => (active ? colors.blue3 : colors.grey2)};
`;

function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavBar>
      <Item onClick={() => navigate('/')} active={location.pathname === '/'}>
        <HomeIcon active={location.pathname === '/'} />홈
      </Item>
      <Item
        onClick={() => navigate('/clubs')}
        active={location.pathname === '/clubs'}
      >
        <ClubIcon active={location.pathname === '/clubs'} />
        맞춤 동호회
      </Item>
      <Item
        onClick={() => navigate('/record-start')}
        active={location.pathname === '/record-start'}
      >
        <RecordIcon active={location.pathname === '/record-start'} />
        변화기록
      </Item>
      <Item>
        <UserIcon />
        마이페이지
      </Item>
    </NavBar>
  );
}

export default BottomNavigation;
