import React, { useState } from 'react';

const StickManArm1: React.FC = () => {
  const [leftArmAngle, setLeftArmAngle] = useState(0);
  const [rightArmAngle, setRightArmAngle] = useState(0);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // 팔을 드래그로 움직이는 함수
  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingLeft) {
      const angle = Math.min(90, Math.max(-90, -(e.clientY - 200) / 2)); // -부호로 반전
      setLeftArmAngle(angle);
    }
    if (isDraggingRight) {
      const angle = Math.min(90, Math.max(-90, (e.clientY - 200) / 2)); // 부호 반전 제거
      setRightArmAngle(angle);
    }
  };

  // 드래그 시작 이벤트
  const handleMouseDown = (isLeft: boolean) => {
    if (isLeft) {
      setIsDraggingLeft(true);
    } else {
      setIsDraggingRight(true);
    }
  };

  // 드래그 종료 이벤트
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  // 이벤트 리스너 설정 및 해제
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* 왼쪽 상단에 왼쪽 팔 각도 표시 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '18px',
          color: 'black',
        }}
      >
        Left Arm Angle: {leftArmAngle.toFixed(1)}°
      </div>
      {/* 오른쪽 상단에 오른쪽 팔 각도 표시 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '18px',
          color: 'black',
        }}
      >
        Right Arm Angle: {rightArmAngle.toFixed(1)}°
      </div>
      {/* 머리 */}
      <div
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: 'black',
          marginBottom: '-15px',
        }}
      />
      {/* 팔 + 몸통 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* 왼쪽 팔 (드래그 기능) */}
        <div
          onMouseDown={() => handleMouseDown(true)}
          style={{
            width: '90px',
            height: '15px',
            backgroundColor: 'black',
            position: 'absolute',
            left: '-90px',
            top: '30px',
            transform: `rotate(${leftArmAngle}deg)`,
            transformOrigin: 'right center',
            transition: 'transform 0.1s ease',
          }}
        />
        {/* 왼쪽 팔과 몸통이 만나는 지점 표시 */}
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            left: '-90px',
            top: '35px', // 팔의 위치와 일치하도록 조정
            zIndex: 2,
          }}
        />
        {/* 몸통 */}
        <div
          style={{
            width: '15px',
            height: '180px',
            backgroundColor: 'black',
            position: 'relative',
            zIndex: 1,
            marginBottom: '-15px',
          }}
        />
        {/* 오른쪽 팔 (드래그 기능) */}
        <div
          onMouseDown={() => handleMouseDown(false)}
          style={{
            width: '90px',
            height: '15px',
            backgroundColor: 'black',
            position: 'absolute',
            right: '-90px',
            top: '30px',
            transform: `rotate(${rightArmAngle}deg)`,
            transformOrigin: 'left center',
            transition: 'transform 0.1s ease',
          }}
        />
        {/* 오른쪽 팔과 몸통이 만나는 지점 표시 */}
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            right: '-90px',
            top: '35px', // 팔의 위치와 일치하도록 조정
            zIndex: 2,
          }}
        />
      </div>
      {/* 다리 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '75px',
          marginTop: '5px',
        }}
      >
        <div
          style={{
            width: '15px',
            height: '150px',
            backgroundColor: 'black',
            transform: 'rotate(10deg)',
            transformOrigin: 'top center',
          }}
        />
        <div
          style={{
            width: '15px',
            height: '150px',
            backgroundColor: 'black',
            transform: 'rotate(-10deg)',
            transformOrigin: 'top center',
          }}
        />
      </div>
    </div>
  );
};

export default StickManArm1;
