import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const MaintainWeight = ({
    fill = '#FF33DD' as ColorValue,
    width = 18,
    height = 21,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M8.99121 12.5L6.89062 15.8047L5.29102 20.208C5.19727 20.46 5.04199 20.627 4.8252 20.709C4.6084 20.7969 4.39453 20.8027 4.18359 20.7266C3.9668 20.6562 3.80859 20.5098 3.70898 20.2871C3.60938 20.0703 3.60059 19.8506 3.68262 19.6279L5.2998 15.1807L6.9082 10.7686V6.76953C6.9082 6.58203 6.82617 6.44434 6.66211 6.35645L1.21289 3.45605C1.00195 3.34473 0.861328 3.17773 0.791016 2.95508C0.720703 2.73242 0.744141 2.5127 0.861328 2.2959C0.972656 2.09082 1.13965 1.95312 1.3623 1.88281C1.58496 1.8125 1.80176 1.83594 2.0127 1.95312L7.26855 4.73047C7.83691 5.0293 8.41113 5.17871 8.99121 5.17871C9.57129 5.17871 10.1455 5.0293 10.7139 4.73047L15.9785 1.95312C16.1895 1.83594 16.4062 1.8125 16.6289 1.88281C16.8516 1.95312 17.0186 2.09082 17.1299 2.2959C17.2412 2.5127 17.2617 2.73242 17.1914 2.95508C17.127 3.17773 16.9893 3.34473 16.7783 3.45605L11.3291 6.35645C11.165 6.44434 11.083 6.58203 11.083 6.76953V10.7686L12.6914 15.1807L14.3086 19.6279C14.3906 19.8506 14.3818 20.0703 14.2822 20.2871C14.1826 20.5098 14.0215 20.6562 13.7988 20.7266C13.5938 20.8027 13.3828 20.7969 13.166 20.709C12.9492 20.627 12.7939 20.46 12.7002 20.208L11.1006 15.8047L8.99121 12.5ZM8.99121 4.26465C8.63379 4.26465 8.30566 4.17676 8.00684 4.00098C7.71387 3.8252 7.47949 3.59082 7.30371 3.29785C7.13379 2.99902 7.04883 2.67383 7.04883 2.32227C7.04883 1.96484 7.13379 1.63965 7.30371 1.34668C7.47949 1.05371 7.71387 0.819336 8.00684 0.643555C8.30566 0.467773 8.63379 0.379883 8.99121 0.379883C9.34863 0.379883 9.67383 0.467773 9.9668 0.643555C10.2598 0.819336 10.4912 1.05371 10.6611 1.34668C10.8369 1.63965 10.9248 1.96484 10.9248 2.32227C10.9248 2.67383 10.8369 2.99902 10.6611 3.29785C10.4912 3.59082 10.2598 3.8252 9.9668 4.00098C9.67383 4.17676 9.34863 4.26465 8.99121 4.26465Z"
                fill={fill}
            />
        </Svg>
    );
};

export default MaintainWeight;
