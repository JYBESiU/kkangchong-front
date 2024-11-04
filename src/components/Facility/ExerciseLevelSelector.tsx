import React from 'react';

const ExerciseLevelSelector: React.FC = () => {
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
          운동 등급
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
          운동의 난이도를 선택하세요 (최소 1개 이상 다중 선택 가능)
        </div>
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 30,
          display: 'inline-flex',
        }}
      >
        <ExerciseLevelBox
          title="초급"
          description="운동을 거의 해본 적이 없는 사람"
        />
        <ExerciseLevelBox
          title="중급"
          description="3개월 이상의 경험이 있는 사람"
        />
        <ExerciseLevelBox
          title="상급"
          description="1년 이상의 경험이 있는 사람"
        />
        <ExerciseLevelBox title="마스터" description="대회를 준비하는 선수" />
      </div>
    </div>
  );
};

interface ExerciseLevelBoxProps {
  title: string;
  description: string;
}

const ExerciseLevelBox: React.FC<ExerciseLevelBoxProps> = ({
  title,
  description,
}) => {
  return (
    <div
      style={{
        width: 127.5,
        height: 100,
        padding: 20,
        background: 'white',
        borderRadius: 8,
        border: '1px #E9E9E9 solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          color: '#222325',
          fontSize: 16,
          fontFamily: 'Noto Sans KR',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          color: '#222325',
          fontSize: 12,
          fontFamily: 'Noto Sans KR',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        {description}
      </div>
    </div>
  );
};

export default ExerciseLevelSelector;
