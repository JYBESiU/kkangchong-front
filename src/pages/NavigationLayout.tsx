import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/shared/BottomNavigation';

function NavigationLayout() {
  return (
    <div>
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default NavigationLayout;
