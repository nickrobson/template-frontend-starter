import '@testing-library/jest-dom';
import { toHaveCompiledCss } from '@compiled/jest';
import { cleanup } from '@testing-library/react';

expect.extend({
  toHaveCompiledCss,
});

afterEach(() => {
  cleanup();
});
