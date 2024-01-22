import { render } from '@testing-library/react';
import { Heading } from './Heading';

describe('<Heading />', () => {
  it('should render heading text', () => {
    const { getByRole } = render(<Heading size={3}>My heading</Heading>);

    expect(
      getByRole('heading', { name: 'My heading', level: 3 })
    ).toBeInTheDocument();
  });

  it('should render styled heading', () => {
    const { getByRole } = render(<Heading size={3}>My heading</Heading>);
    expect(getByRole('heading')).toHaveCompiledCss({ color: '#30c' });
  });

  it.each`
    size
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
    ${6}
  `('should render h$size when passed size $size', ({ size }) => {
    const { getByText } = render(<Heading size={size}>heading</Heading>);

    expect(getByText('heading').tagName).toBe(`H${size}`);
  });
});
