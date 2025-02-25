import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const AnalyticsSvg = ({
    fill = 'white' as ColorValue,
    fillOpacity = 1,
    width = 24,
    height = 24,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M11.6699 3C10.5654 3 9.66992 3.89543 9.66992 5V19.001C9.66992 20.1055 10.5654 21.001 11.6699 21.001H12.3399C13.4445 21.001 14.3399 20.1055 14.3399 19.001V5C14.3399 3.89543 13.4445 3 12.3399 3H11.6699Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
            <Path
                d="M5 13.001C3.89543 13.001 3 13.8964 3 15.001V19.001C3 20.1055 3.89543 21.001 5 21.001H5.67C6.77457 21.001 7.67 20.1055 7.67 19.001V15.001C7.67 13.8964 6.77457 13.001 5.67 13.001H5Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
            <Path
                d="M16.3398 10C16.3398 8.89543 17.2353 8 18.3398 8H19.0098C20.1144 8 21.0098 8.89543 21.0098 10V19.001C21.0098 20.1055 20.1144 21.001 19.0098 21.001H18.3398C17.2353 21.001 16.3398 20.1055 16.3398 19.001V10Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
        </Svg>
    );
};

export default AnalyticsSvg;
