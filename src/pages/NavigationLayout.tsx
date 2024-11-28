import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/shared/BottomNavigation';

function NavigationLayout() {
  return (
    <div style={{ width: '393px', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          height: 'calc(100% - 56px)',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default NavigationLayout;
