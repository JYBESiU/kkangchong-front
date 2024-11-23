import styled from '@emotion/styled';
import RecommendSport from 'components/RecommendSport';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export interface RecommendPageProps {}

function RecommendPage({}: RecommendPageProps) {
  const params = useParams<{ recommendId: string }>();

  return (
    <Root>
      {params.recommendId ? (
        <RecommendSport recommendId={params.recommendId} />
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
}

export default RecommendPage;

const Root = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
`;
