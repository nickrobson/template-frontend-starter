/** @jsxImportSource @compiled/react */
import * as React from 'react';
import { css } from '@compiled/react';

type HeadingProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = ({ size, children }) => {
  switch (size) {
    case 1:
      return <h1 css={headingStyles}>{children}</h1>;
    case 2:
      return <h2 css={headingStyles}>{children}</h2>;
    case 3:
      return <h3 css={headingStyles}>{children}</h3>;
    case 4:
      return <h4 css={headingStyles}>{children}</h4>;
    case 5:
      return <h5 css={headingStyles}>{children}</h5>;
    case 6:
      return <h6 css={headingStyles}>{children}</h6>;
  }
};

const headingStyles = css({
  color: '#3300cc',
});
