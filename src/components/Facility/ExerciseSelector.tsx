import React, { useState } from 'react';
import {
  exerciseNames,
  exerciseItems,
  ExerciseItem,
} from './types-for-FacilitySearch';

const ExerciseSelector: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const selectedItems: ExerciseItem[] = selectedExercise
    ? exerciseItems[selectedExercise] || []
    : [];

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
      {/* Header Section */}
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
            fontWeight: 700,
            wordWrap: 'break-word',
          }}
        >
          운동 종목
        </div>
        <div
          style={{
            color: '#4A77EA',
            fontSize: 12,
            fontFamily: 'Noto Sans KR',
            fontWeight: 400,
            wordWrap: 'break-word',
          }}
        >
          동호회를 만들 운동 종목을 선택하세요 (단일 선택)
        </div>
      </div>

      {/* Exercise Boxes */}
      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 30,
          display: 'inline-flex',
          flexWrap: 'wrap',
        }}
      >
        {exerciseNames.map((name) => (
          <div
            key={name}
            onClick={() => setSelectedExercise(name)}
            style={{
              cursor: 'pointer',
              height: 59,
              paddingLeft: 29,
              paddingRight: 29,
              paddingTop: 18,
              paddingBottom: 18,
              background: 'white',
              borderRadius: 8,
              border: '1px #E9E9E9 solid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex',
              transition: 'background 0.3s, border-color 0.3s',
              backgroundColor: selectedExercise === name ? '#E9E9E9' : 'white',
              borderColor: selectedExercise === name ? '#4A77EA' : '#E9E9E9',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: '#222325',
                fontSize: 16,
                fontFamily: 'Noto Sans KR',
                fontWeight: 400,
                wordWrap: 'break-word',
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Items Section */}
      <div
        style={{
          alignSelf: 'stretch',
          minHeight: 140,
          padding: 30,
          background: '#F7F8FC',
          borderRadius: 8,
          overflow: 'hidden',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 10,
          display: 'inline-flex',
          flexWrap: 'wrap',
        }}
      >
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <OtherOption
              key={item.title}
              title={item.title}
              count={item.count}
            />
          ))
        ) : (
          <div
            style={{
              color: '#4A77EA',
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 400,
              wordWrap: 'break-word',
            }}
          >
            선택된 운동 종목이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

interface OtherOptionProps {
  title: string;
  count: number;
}

const OtherOption: React.FC<OtherOptionProps> = ({ title, count }) => (
  <div
    style={{
      marginRight: 20,
    }}
  >
    <span
      style={{
        color: '#222325',
        fontSize: 16,
        fontFamily: 'Noto Sans KR',
        fontWeight: 400,
        wordWrap: 'break-word',
      }}
    >
      {title}{' '}
    </span>
    <span
      style={{
        color: '#4A77EA',
        fontSize: 16,
        fontFamily: 'Noto Sans KR',
        fontWeight: 400,
        wordWrap: 'break-word',
      }}
    >
      ({count})
    </span>
  </div>
);

export default ExerciseSelector;
