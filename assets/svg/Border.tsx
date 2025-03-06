import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Border = ({
    fill = '#FFFFFF' as ColorValue,
    width = 26,
    height = 26,
    strokeOpacity = 0.48
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M7.66634 2.33331H6.33301C4.12387 2.33331 2.33301 4.12418 2.33301 6.33331V7.66665M18.333 2.33331H19.6663C21.8755 2.33331 23.6663 4.12418 23.6663 6.33331V7.66665M23.6663 18.3333V19.6666C23.6663 21.8758 21.8755 23.6666 19.6663 23.6666H18.333M7.66634 23.6666H6.33301C4.12387 23.6666 2.33301 21.8758 2.33301 19.6666V18.3333"
                fill={fill}
                strokeOpacity={strokeOpacity}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Border;
