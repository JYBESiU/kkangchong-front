import React from 'react';
import { MeasuringStep } from 'utils/measuringStep';
import { getSubNotice } from './ReadyInformation';
import styled from '@emotion/styled';
import { colors } from 'utils/color';

interface SubNoticeTextProps {
  step: MeasuringStep; // Ensure this is the correct type for the step
}

const SubText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position: absolute;
  top: 718px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 400;
  color: ${colors.blue3};
  z-index: 2;
  text-align: center;
  white-space: nowrap;
`;

const SubNoticeText: React.FC<SubNoticeTextProps> = ({ step }) => {
  const subNoticeText = getSubNotice(step);
  return (
    <SubText>
      {subNoticeText &&
        subNoticeText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
    </SubText>
  );
};

export default SubNoticeText;
