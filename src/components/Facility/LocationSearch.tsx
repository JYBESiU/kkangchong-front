import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationSearch: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/destination'); // Navigate to the destination page
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: '0px 4px 4px rgba(185, 192, 211, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 600,
          height: 90,
          background: '#4A77EA',
          borderRadius: 8,
        }}
      />
      <div
        style={{
          width: 359,
          textAlign: 'center',
          color: 'white',
          fontSize: 16,
          fontFamily: 'Noto Sans KR',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        장소 검색
      </div>
      <button
        onClick={handleSearchClick}
        style={{
          marginTop: 10,
          padding: '10px 20px',
          backgroundColor: '#4A77EA',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        검색하기
      </button>
    </div>
  );
};

export default LocationSearch;
