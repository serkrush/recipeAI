import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const FlashSlash = ({
    fill = '#FFFFFF' as ColorValue,
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
                d="m17.084,15.67l2.551-3.847c.502-.757.548-1.725.119-2.525-.43-.801-1.261-1.298-2.17-1.298h-3.801L15.806,0h-3.321l-4.415,6.656L1.457.043.043,1.457l22.5,22.5,1.414-1.414-6.873-6.873Zm-2.256,3.401l-3.27,4.929h-3.321l2.023-8h-3.774c-.917,0-1.757-.503-2.191-1.313-.428-.798-.385-1.76.113-2.51l1.406-2.12,9.014,9.014Z"
                fill={fill}
            />
        </Svg>
    );
};

export default FlashSlash;