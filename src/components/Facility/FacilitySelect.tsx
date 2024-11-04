import ExerciseSelector from './ExerciseSelector';
import ExerciseLevelSelector from './ExerciseLevelSelector';
import ParticipantClassificationSelector from './ParticipantClassificationSelector';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LocationSearch from './LocationSearch';
import DestinationPage from './DestinationPage';

type BoxProps = {
  width?: string | number;
  height?: string | number;
  flexDirection?: 'column' | 'row';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number;
  display?: 'inline-flex' | 'flex';
  alignSelf?: 'stretch';
  backgroundColor?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  border?: string;
  borderRadius?: number;
  boxShadow?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';
  transform?: string;
  transformOrigin?: string;
  left?: number;
  top?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  wordWrap?: 'break-word' | 'normal';
  text?: string;
  children?: React.ReactNode;
};

const Box: React.FC<BoxProps> = ({
  width = '100%',
  height = '100%',
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  gap,
  backgroundColor,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  border,
  borderRadius,
  boxShadow,
  position,
  transform,
  transformOrigin,
  left,
  top,
  color,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  wordWrap = 'normal',
  text,
  children,
}) => (
  <div
    style={{
      width,
      height,
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
      gap,
      backgroundColor,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      border,
      borderRadius,
      boxShadow,
      position,
      transform,
      transformOrigin,
      left,
      top,
      color,
      fontSize,
      fontFamily,
      fontWeight,
      textAlign,
      wordWrap,
    }}
  >
    {text && <span>{text}</span>}
    {children}
  </div>
);

const MainPage: React.FC = () => (
  <Box
    width="670px"
    height="100vh"
    backgroundColor="white"
    boxShadow="4px 0px 10px rgba(185.01, 192.44, 211.44, 0.08"
  >
    <Box
      width="670px"
      height="100%"
      paddingTop={25}
      paddingBottom={26}
      paddingLeft={30}
      paddingRight={30}
      backgroundColor="white"
      boxShadow="0px 4px 5px rgba(185, 192, 211, 0.08)"
      justifyContent="center"
      alignItems="flex-end"
      gap={437}
      display="inline-flex"
    >
      <Box
        justifyContent="flex-start"
        alignItems="center"
        gap={10}
        display="inline-flex"
      >
        <Box width={24} height={24} position="relative">
          <Box
            width={11.78}
            height={20}
            left={0}
            top={2}
            position="absolute"
            backgroundColor="#222325"
          ></Box>
        </Box>
        <Box
          color="black"
          fontSize={20}
          fontFamily="Noto Sans KR"
          fontWeight={400}
          wordWrap="break-word"
        >
          동호회 만들기
        </Box>
      </Box>
      <Box
        width={24}
        height={24}
        position="relative"
        transform="rotate(90deg)"
        transformOrigin="0 0"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="flex"
      >
        <Box width={16} height={4} backgroundColor="#222325"></Box>
      </Box>
    </Box>
    {/* Render ExerciseSelector */}
    <ExerciseSelector />
    <div style={{ padding: '20px' }}>
      <ExerciseLevelSelector />
    </div>
    <div style={{ padding: '20px' }}>
      <ParticipantClassificationSelector />
    </div>
    <Router>
      <div style={{ padding: '20px' }}>
        <LocationSearch />
        <Routes>
          <Route path="/destination" element={<DestinationPage />} />
        </Routes>
      </div>
    </Router>
  </Box>
);

export default MainPage;
