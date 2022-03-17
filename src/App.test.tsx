import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('<App />', () => {
  it('should render', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'template-frontend-starter'
    );
    expect(screen.getByRole('main')).toHaveTextContent(
      'Hello there! This template is intended to make bootstrapping a modern frontend project easy.'
    );
  });
});
