import React, { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Insta: FC<SvgProps> = (props) => {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M20 5a5.015 5.015 0 015 5v10a5.015 5.015 0 01-5 5H10a5.016 5.016 0 01-5-5V10a5.015 5.015 0 015-5h10zm0-2H10c-3.85 0-7 3.15-7 7v10c0 3.85 3.15 7 7 7h10c3.85 0 7-3.15 7-7V10c0-3.85-3.15-7-7-7z"
        fill="currentColor"
      />
      <Path
        d="M21.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM15 10.999a4 4 0 110 8 4 4 0 010-8zm0-2a6 6 0 100 12 6 6 0 000-12z"
        fill="currentColor"
      />
    </Svg>
  );
};
