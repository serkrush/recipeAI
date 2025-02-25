import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Cook = ({
    fill = '#FFFFFF' as ColorValue,
    width = 28,
    height = 28,
    fillOpacity = 0.48
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M20.0625 5.83249L20.0656 5.83789C23.1795 5.96 25.6663 8.52292 25.6663 11.6667C25.6663 14.0587 24.2266 16.1145 22.1663 17.0147V18.6667H5.83301V17.0147C3.77279 16.1145 2.33301 14.0587 2.33301 11.6667C2.33301 8.52299 4.81978 5.96013 7.93351 5.83791C9.14319 3.74309 11.4068 2.33334 13.9997 2.33334C16.5921 2.33334 18.8539 3.74324 20.0625 5.83249Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
            <Path
                d="M5.83301 21V22.1667C5.83301 24.0997 7.40002 25.6667 9.33301 25.6667H18.6663C20.5994 25.6667 22.1663 24.0997 22.1663 22.1667V21H5.83301Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
        </Svg>
    );
};

export default Cook;