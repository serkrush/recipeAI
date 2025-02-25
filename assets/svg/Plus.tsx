import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Plus = ({
    fill = 'white' as ColorValue,
    fillOpacity = 1,
    width = 20,
    height = 20,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M10 2V10M10 10V18M10 10H2M10 10H18"
                fill={fill}
                fillOpacity={fillOpacity}
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default Plus;
