import styled from '@emotion/styled';
import background from 'images/background.svg';

export const Hero = styled.section`
  min-width: 414px;
  min-height: 200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: left;
  background-image: url(${background});
  background-position: top bottom;
  background-size: cover;
`;

export const Title = styled.h1`
  margin-bottom: 16px;
  font-weight: bold;
  color: white;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: clamp(0.8rem, 2.5vw, 1.4rem);
  max-width: 800px;
  color: white;
  margin-bottom: 16px;
`;
