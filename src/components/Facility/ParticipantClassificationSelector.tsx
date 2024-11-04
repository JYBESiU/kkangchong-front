import React from 'react';

const ParticipantClassificationSelector: React.FC = () => {
  const classifications = [
    '20대 이하',
    '상지장애 전체',
    '하지장애 전체',
    '30대',
    '상지장애 심각',
    '하지장애 심각',
    '40대',
    '상지장애 보통',
    '하지장애 보통',
    '50대 이상',
    '상지장애 양호',
    '하지장애 양호',
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          width: 600,
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            color: '#222325',
            fontSize: 16,
            fontFamily: 'Noto Sans KR',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          모집 동호인 분류
        </div>
        <div
          style={{
            color: '#4A77EA',
            fontSize: 12,
            fontFamily: 'Noto Sans KR',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          운동 대상을 선택하세요 (다중 선택 가능)
        </div>
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 30,
          display: 'inline-flex',
        }}
      >
        {classifications.map((classification, index) => (
          <ClassificationBox key={index} label={classification} />
        ))}
      </div>
    </div>
  );
};

interface ClassificationBoxProps {
  label: string;
}

const ClassificationBox: React.FC<ClassificationBoxProps> = ({ label }) => {
  return (
    <div
      style={{
        width: 127.5,
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        background: 'white',
        borderRadius: 8,
        border: '1px #E9E9E9 solid',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        display: 'flex',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#222325',
          fontSize: 14,
          fontFamily: 'Noto Sans KR',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default ParticipantClassificationSelector;
