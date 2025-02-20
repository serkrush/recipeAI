import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Splash = ({
    fill = '#FFFFFF' as ColorValue,
    width = 124,
    height = 124,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 124 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M88.8495 25.8295L88.8635 25.8534C102.653 26.3941 113.667 37.7442 113.667 51.6666C113.667 62.2598 107.29 71.364 98.1666 75.3506V82.6666H25.8333V75.3506C16.7094 71.364 10.3333 62.2598 10.3333 51.6666C10.3333 37.7445 21.3461 26.3947 35.1355 25.8535C40.4926 16.5764 50.5172 10.3333 61.9999 10.3333C73.4808 10.3333 83.4974 16.5771 88.8495 25.8295Z"
                fill={fill}
            />
            <Path
                d="M25.8333 93V98.1667C25.8333 106.727 32.7729 113.667 41.3333 113.667H82.6666C91.2272 113.667 98.1666 106.727 98.1666 98.1667V93H25.8333Z"
                fill={fill}
            />
        </Svg>
    );
};

export default Splash;
