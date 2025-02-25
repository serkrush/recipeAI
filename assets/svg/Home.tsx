import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Home = ({
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
                d="M14.6861 2.83464C13.1618 1.45323 10.8382 1.45323 9.31392 2.83464L4.31392 7.36589C3.47724 8.12413 3 9.20068 3 10.3298V16.9999C3 19.2091 4.79086 20.9999 7 20.9999H8C9.10457 20.9999 10 20.1045 10 18.9999V15.9999C10 14.8954 10.8954 13.9999 12 13.9999C13.1046 13.9999 14 14.8954 14 15.9999V18.9999C14 20.1045 14.8954 20.9999 16 20.9999H17C19.2091 20.9999 21 19.2091 21 16.9999V10.3298C21 9.20069 20.5228 8.12413 19.6861 7.36589L14.6861 2.83464Z"
                fill={fill}
                fillOpacity={fillOpacity}
            />
        </Svg>
    );
};

export default Home;
