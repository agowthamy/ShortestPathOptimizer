import React from 'react';
import GraphCard from '../components/Graph/GraphCard';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for the upper part of the page
const UpperPart = styled('div')({
  height: '40vh', 
  background: '#1554A3', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

// Styled component for the lower part of the page
const LowerPart = styled('div')({
  height: '60vh', 
  background: '#E7F3FF', 
});

// Styled component for the title text
const Title = styled(Typography)({
  color: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  marginTop: 5,
  fontSize: '2.2rem',
});

// Styled component for the subtitle text
const SubTitle = styled(Typography)({
  color: '#FFFFFF',
  marginTop: 2,
  fontSize: '1rem',
});

// Styled component for the container of the graph card
const GraphContainer = styled('div')({
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  width: '55%',
});

const ShortestPathCalculatorPage: React.FC = () => {
  return (
    <>
      {/* Upper part of the page */}
      <UpperPart>
        <Title>
          Dijkstra's Algorithm Calculator
        </Title>
        <SubTitle>
          Discovering Optimal Routes Through Nodes Using Dijkstra's Method
        </SubTitle>
      </UpperPart>
      {/* Lower part of the page */}
      <LowerPart></LowerPart>
      {/* Container for the graph card */}
      <GraphContainer>
        <GraphCard />
      </GraphContainer>
    </>
  );
};

export default ShortestPathCalculatorPage;
