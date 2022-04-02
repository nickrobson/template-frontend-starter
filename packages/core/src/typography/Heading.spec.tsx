import { render } from '@testing-library/react';
import { Heading } from './Heading';

describe('<Heading />', () => {
  it('should render heading text', () => {
    const { getByText } = render(<Heading size={3}>heading</Heading>);

    expect(getByText('heading')).toBeInTheDocument();
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
