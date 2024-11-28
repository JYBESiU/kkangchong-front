import React from 'react';
import { getNotice } from './PoseMeasuring';
import { MeasuringStep } from 'types';

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
