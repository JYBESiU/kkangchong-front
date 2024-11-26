import React from 'react';
import { MeasuringStep } from 'utils/measuringStep';
import { getNotice } from './PoseMeasuring';

interface NoticeTextProps {
  step: MeasuringStep;
}

const NoticeText: React.FC<NoticeTextProps> = ({ step }) => {
  const noticeText = getNotice(step);
  return (
    <div>
      {noticeText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default NoticeText;
