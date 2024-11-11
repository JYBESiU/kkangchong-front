import React from 'react';
import { ShoulderWidthProvider } from './ShoulderWidthContext';
import ShoulderFront from './ShoulderFront';

const WaistRotationMain: React.FC = () => {
  return (
    <ShoulderWidthProvider>
      <ShoulderFront />
      {/* Other components can also consume the shoulderWidth context here */}
    </ShoulderWidthProvider>
  );
};

export default WaistRotationMain;
