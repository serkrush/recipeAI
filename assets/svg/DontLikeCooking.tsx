import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const DontLikeCooking = ({
    fill = '#FF33DD' as ColorValue,
    width = 28,
    height = 17,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 28 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M0.166016 8.74414C0.166016 8.22266 0.441406 7.73926 0.992188 7.29395C1.54297 6.84277 2.32227 6.44727 3.33008 6.10742C4.33789 5.76758 5.5332 5.50391 6.91602 5.31641C8.29883 5.12305 9.81934 5.02637 11.4775 5.02637C13.1416 5.02637 14.6621 5.12305 16.0391 5.31641C17.4219 5.50391 18.6172 5.76758 19.625 6.10742C20.6328 6.44727 21.4121 6.84277 21.9629 7.29395C22.5195 7.73926 22.7979 8.22266 22.7979 8.74414C22.7979 9.94531 22.5283 11.0381 21.9893 12.0225C21.4502 13.001 20.6826 13.8418 19.6865 14.5449C18.6963 15.2539 17.5039 15.7988 16.1094 16.1797C14.7207 16.5605 13.1768 16.751 11.4775 16.751C9.77246 16.751 8.22559 16.5605 6.83691 16.1797C5.4541 15.7988 4.26465 15.2539 3.26855 14.5449C2.27246 13.8418 1.50488 13.001 0.96582 12.0225C0.432617 11.0381 0.166016 9.94531 0.166016 8.74414ZM1.80957 8.74414C1.80957 8.91992 1.97949 9.10449 2.31934 9.29785C2.65918 9.49121 3.13086 9.68164 3.73438 9.86914C4.34375 10.0566 5.05566 10.2236 5.87012 10.3701C6.68457 10.5166 7.56641 10.6367 8.51562 10.7305C9.4707 10.8184 10.458 10.8623 11.4775 10.8623C12.5029 10.8623 13.4902 10.8184 14.4395 10.7305C15.3945 10.6367 16.2764 10.5166 17.085 10.3701C17.8994 10.2236 18.6084 10.0566 19.2119 9.86914C19.8213 9.68164 20.2959 9.49121 20.6357 9.29785C20.9756 9.10449 21.1455 8.91992 21.1455 8.74414C21.1455 8.5918 21.0195 8.43359 20.7676 8.26953C20.5215 8.09961 20.1729 7.93555 19.7217 7.77734C19.2705 7.61328 18.7402 7.46094 18.1309 7.32031C17.5273 7.17969 16.8652 7.05371 16.1445 6.94238C15.4238 6.83105 14.668 6.74316 13.877 6.67871C13.0859 6.61426 12.2861 6.58203 11.4775 6.58203C10.6631 6.58203 9.86035 6.61426 9.06934 6.67871C8.28418 6.74316 7.53125 6.83105 6.81055 6.94238C6.08984 7.05371 5.4248 7.17969 4.81543 7.32031C4.21191 7.46094 3.68457 7.61328 3.2334 7.77734C2.78223 7.93555 2.43066 8.09961 2.17871 8.26953C1.93262 8.43359 1.80957 8.5918 1.80957 8.74414ZM20.9346 7.90039L16.874 6.19531L23.8525 1.08887C24.3564 0.713867 24.8369 0.494141 25.2939 0.429688C25.751 0.359375 26.1582 0.400391 26.5156 0.552734C26.873 0.699219 27.1631 0.918945 27.3857 1.21191C27.6143 1.50488 27.7549 1.83301 27.8076 2.19629C27.8604 2.55371 27.8076 2.9082 27.6494 3.25977C27.4912 3.60547 27.207 3.91016 26.7969 4.17383L20.9346 7.90039ZM6.24805 11.1787C6.30664 10.7979 6.46191 10.4551 6.71387 10.1504C6.97168 9.83984 7.29102 9.59668 7.67188 9.4209C8.05859 9.23926 8.48047 9.14844 8.9375 9.14844C9.10156 9.14844 9.25391 9.16016 9.39453 9.18359C9.54102 9.20117 9.6875 9.2334 9.83398 9.28027C10.1445 8.8877 10.54 8.57715 11.0205 8.34863C11.5068 8.11426 12.0342 7.99707 12.6025 7.99707C13.2119 7.99707 13.7744 8.13184 14.29 8.40137C14.8057 8.6709 15.2129 9.04883 15.5117 9.53516C15.8105 10.0156 15.9512 10.5752 15.9336 11.2139L6.24805 11.1787Z"
                fill={fill}
            />
        </Svg>
    );
};

export default DontLikeCooking;
