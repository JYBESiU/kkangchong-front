import styled from '@emotion/styled';
import Text from './Text';

export interface PanelHeaderProps {
  title: string;
}

function PanelHeader({ title }: PanelHeaderProps) {
  return (
    <Root>
      <Text fontSize={20}>{title}</Text>
    </Root>
  );
}

export default PanelHeader;

const Root = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  box-shadow: 0px 4px 5px 0px rgba(185, 192, 211, 0.08);
`;
