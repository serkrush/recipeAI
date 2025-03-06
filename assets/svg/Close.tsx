import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Close = ({
    fill = '#ffffff' as ColorValue,
    fillOpacity = 0.4,
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
                d="M3.49112 3.49112C3.97928 3.00296 4.77073 3.00296 5.25889 3.49112L10 8.23224L14.7411 3.49112C15.2293 3.00296 16.0208 3.00296 16.5089 3.49112C16.997 3.97928 16.997 4.77073 16.5089 5.25889L11.7678 10L16.5089 14.7411C16.997 15.2293 16.997 16.0208 16.5089 16.5089C16.0208 16.997 15.2293 16.997 14.7411 16.5089L10 11.7678L5.25889 16.5089C4.77073 16.997 3.97928 16.997 3.49112 16.5089C3.00296 16.0208 3.00296 15.2293 3.49112 14.7411L8.23224 10L3.49112 5.25889C3.00296 4.77073 3.00296 3.97928 3.49112 3.49112Z"
                fill={fill}
                fillOpacity={fillOpacity}
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default Close;
