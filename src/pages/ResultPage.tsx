import styled from '@emotion/styled';
import MeasureResult from 'components/MeasureResult';

export interface ResultPageProps {}

function ResultPage({}: ResultPageProps) {
  return (
    <Root>
      <MeasureResult />
    </Root>
  );
}

export default ResultPage;

const Root = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
`;
