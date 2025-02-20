import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowDown = ({
    fill = '#FFFFFF' as ColorValue,
    width = 10,
    height = 6,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5858 4.9999C4.3668 5.781 5.6332 5.781 6.4142 4.9999L9.7071 1.707C10.0976 1.3165 10.0976 0.683318 9.7071 0.292798C9.3166 -0.0977215 8.6834 -0.0977215 8.2929 0.292798L5 3.5857L1.70711 0.292798C1.31658 -0.0977215 0.68342 -0.0977215 0.29289 0.292798C-0.09763 0.683318 -0.09763 1.3165 0.29289 1.707L3.5858 4.9999Z"
                fill={fill}
                fillOpacity="0.48"
            />
        </Svg>
    );
};

export default ArrowDown;
