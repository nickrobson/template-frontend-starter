import { Heading } from '@template-frontend-starter/core/src/typography/Heading';

export const App = () => {
  return (
    <>
      <header>
        <Heading size={1}>template-frontend-starter</Heading>
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
