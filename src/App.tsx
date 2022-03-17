import { styled } from '@compiled/react';

const StyledH1 = styled.h1`
  color: #333;
`;

export const App = () => {
  return (
    <>
      <header>
        <StyledH1>template-frontend-starter</StyledH1>
      </header>
      <main>
        <p>
          Hello there! This template is intended to make bootstrapping a modern
          frontend project easy.
        </p>
      </main>
    </>
  );
};
