import { Link, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const location = useLocation();

  return (
    <nav style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        홈
      </Link>
      <Link
        to="/clubs"
        className={location.pathname === '/clubs' ? 'active' : ''}
      >
        클럽
      </Link>
      <Link
        to="/record-start"
        className={location.pathname === '/record-start' ? 'active' : ''}
      >
        기록
      </Link>
    </nav>
  );
}

export default BottomNavigation;
