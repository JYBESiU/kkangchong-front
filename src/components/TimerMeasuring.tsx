import React, { useState, useEffect } from 'react';

interface TimerMeasuringProps {
  onTimeStop?: (time: number | null) => void; // New prop to handle elapsed time
}

const TimerMeasuring: React.FC<TimerMeasuringProps> = ({ onTimeStop }) => {
  const [seconds, setSeconds] = useState(0); // Elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  // Start or stop the timer
  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false); // Stop the timer
      if (onTimeStop) {
        onTimeStop(seconds); // Pass the elapsed time to the parent
      }
    } else {
      setIsRunning(true); // Start the timer
    }
  };

  // Reset the timer
  const resetTimer = () => {
    setSeconds(0); // Reset elapsed time
    setIsRunning(false); // Stop the timer
  };

  // Timer logic: incrementing seconds if running, up to 60 seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && seconds < 60) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1); // Increment the time every second
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clear the interval when the component unmounts or stops
      }
    };
  }, [isRunning, seconds]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'white',
      }}
    >
      <div
        style={{
          width: 393,
          height: 100,
          paddingTop: 64,
          paddingBottom: 13,
          paddingLeft: 323,
          paddingRight: 40,
          left: 0,
          top: 0,
          position: 'absolute',
          justifyContent: 'flex-end',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            color: '#4A77EA',
            fontSize: 16,
            fontFamily: 'Noto Sans KR',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          취소
        </div>
      </div>

      <div
        style={{
          width: 215,
          height: 116,
          paddingLeft: 1,
          paddingRight: 1,
          left: 89,
          top: 318,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#4A77EA',
            fontSize: 80,
            fontFamily: 'Noto Sans KR',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {isRunning ? `${seconds}초` : '측정 완료'}{' '}
          {/* Show elapsed time when stopped */}
        </div>
      </div>

      <div
        style={{
          height: 59,
          paddingLeft: 31,
          paddingRight: 31,
          paddingTop: 15,
          paddingBottom: 15,
          left: 40.5,
          top: 693,
          position: 'absolute',
          background: '#797982',
          borderRadius: 8,
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Noto Sans KR',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
          onClick={resetTimer}
        >
          다시 측정 {/* Button to restart the timer */}
        </div>
      </div>

      <div
        style={{
          height: 59,
          paddingLeft: 31,
          paddingRight: 31,
          paddingTop: 15,
          paddingBottom: 15,
          left: 40.5,
          top: 624,
          position: 'absolute',
          background: '#4A77EA',
          borderRadius: 8,
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Noto Sans KR',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
          onClick={toggleTimer}
        >
          {isRunning ? '측정 중지' : '측정 시작'}{' '}
          {/* Toggle between start and stop */}
        </div>
      </div>
    </div>
  );
};

export default TimerMeasuring;
