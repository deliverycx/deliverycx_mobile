import React, {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const Tg: FC<SvgProps> = props => {
  return (
    <Svg width={46} height={46} viewBox="0 0 36 36" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33 18c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C3 9.716 9.716 3 18 3c8.284 0 15 6.716 15 15zm-14.462-3.926c-1.46.607-4.375 1.863-8.748 3.768-.71.282-1.082.558-1.116.828-.057.457.514.637 1.293.881l.328.105c.766.249 1.796.54 2.332.552.485.01 1.028-.19 1.626-.601 4.086-2.758 6.195-4.152 6.327-4.182.094-.022.223-.048.31.03.089.078.08.225.07.265-.056.241-2.3 2.328-3.461 3.407-.362.337-.619.576-.671.63-.118.122-.238.238-.353.349-.712.686-1.245 1.2.03 2.04.612.404 1.102.737 1.591 1.07.534.364 1.067.727 1.756 1.179.176.115.343.234.507.35.621.444 1.18.842 1.87.778.4-.037.814-.413 1.024-1.538.497-2.656 1.474-8.412 1.7-10.784a2.643 2.643 0 00-.025-.59.632.632 0 00-.214-.407c-.18-.145-.457-.176-.581-.174-.564.01-1.43.311-5.595 2.044z"
        fill="#8D191D"
      />
    </Svg>
  );
};