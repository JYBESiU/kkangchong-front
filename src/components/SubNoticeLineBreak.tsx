import React from 'react';
import { MeasuringStep } from 'types';
import { getSubNotice } from './ReadyInformation';
import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from './shared';

interface SubNoticeTextProps {
  step: MeasuringStep; // Ensure this is the correct type for the step
}

const SubNoticeText: React.FC<SubNoticeTextProps> = ({ step }) => {
  const subNoticeText = getSubNotice(step);
  return (
    <div style={{ textAlign: 'center' }}>
      {subNoticeText &&
        subNoticeText.split('\n').map((line, index) => (
          <Text fontSize={16} color={'blue3'} key={index}>
            {line}
            <br />
          </Text>
        ))}
    </div>
  );
};

export default SubNoticeText;
