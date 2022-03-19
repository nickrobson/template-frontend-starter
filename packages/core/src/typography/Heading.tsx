import * as React from 'react';
import { styled } from '@compiled/react';

const StyledHeading = styled.h1({
  color: '#3300cc',
});

type HeadingProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = ({ size, children }) => (
  <StyledHeading as={`h${size}`}>{children}</StyledHeading>
);
