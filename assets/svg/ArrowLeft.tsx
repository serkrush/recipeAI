import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowLeft = ({
    fill = '#FFFFFF' as ColorValue,
    width = 10,
    height = 6,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58044 0.410047C7.02116 -0.136682 6.11443 -0.136682 5.55501 0.410047L0.838967 5.02013C-0.279656 6.11354 -0.279656 7.8865 0.838967 8.9799L5.55501 13.59C6.11443 14.1367 7.02116 14.1367 7.58044 13.59C8.13985 13.0433 8.13985 12.1568 7.58044 11.6101L2.86448 7.00002L7.58044 2.38996C8.13985 1.84322 8.13985 0.95679 7.58044 0.410047Z"
                fill={fill}
            />
        </Svg>
    );
};

export default ArrowLeft;
