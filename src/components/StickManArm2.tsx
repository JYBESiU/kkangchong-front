import React, { useState } from 'react';

const StickManArm2: React.FC = () => {
  const [armAngle, setArmAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 팔을 드래그로 움직이는 함수
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // 팔 각도 계산: -90도(아래) ~ 90도(위) 사이로 제한
      const angle = Math.min(90, Math.max(-90, (e.clientY - 200) / 2));
      setArmAngle(angle);
    }
  };

  // 드래그 시작 이벤트
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // 드래그 종료 이벤트
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 이벤트 리스너 설정 및 해제
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* 머리 */}
      <div
        style={{
          width: '117px',
          height: '117px',
          borderRadius: '50%',
          backgroundColor: '#D9D9D9',
          marginBottom: '10px',
          position: 'relative',
          left: '-117px', // 머리를 40px 왼쪽으로 이동
        }}
      />
      {/* 팔 각도 표시 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px', // 우측 상단으로 이동
          fontSize: '18px',
          color: 'black',
        }}
      >
        Arm Angle: {armAngle.toFixed(1)}°
      </div>
      {/* 몸통 */}
      <div
        style={{
          width: '117px',
          height: '200.74px',
          backgroundColor: '#D9D9D9',
          position: 'relative',
          left: '-117px', // 몸통을 40px 왼쪽으로 이동
          flexShrink: 0,
        }}
      />
      {/* 팔 */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '235px',
          height: '33px',
          background: '#FF7E7E',
          position: 'absolute',
          top: '150px', // 몸통의 위치와 맞춰 연결
          transform: `rotate(${armAngle}deg)`,
          transformOrigin: 'left center',
          transition: 'transform 0.1s ease',
          cursor: 'pointer',
          borderRadius: '20px',
          flexShrink: 0,
        }}
      />
      {/* 팔과 몸통이 만나는 지점 표시 */}
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          position: 'relative',
          top: '-165px', // 팔의 위치와 일치하도록 조정
          left: '117px', // 팔이 0도일 때 팔 끝에 맞추도록 조정
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default StickManArm2;
