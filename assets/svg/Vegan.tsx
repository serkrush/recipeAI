import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Vegan = ({
    fill = '#FF33DD' as ColorValue,
    width = 20,
    height = 18,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M0.630859 1.29785C0.707031 0.975586 0.868164 0.791016 1.11426 0.744141C1.36035 0.697266 1.58301 0.776367 1.78223 0.981445C2.20996 1.43262 2.66113 1.76074 3.13574 1.96582C3.61621 2.1709 4.10254 2.2998 4.59473 2.35254C5.09277 2.40527 5.57324 2.43164 6.03613 2.43164C6.46973 2.43164 6.93555 2.40234 7.43359 2.34375C7.9375 2.28516 8.44434 2.22656 8.9541 2.16797C9.46387 2.10937 9.95898 2.08008 10.4395 2.08008C11.875 2.08008 13.1406 2.32031 14.2363 2.80078C15.3379 3.28125 16.1963 4.00195 16.8115 4.96289C17.4326 5.91797 17.7432 7.11328 17.7432 8.54883C17.7432 8.74805 17.7344 8.94434 17.7168 9.1377C17.7051 9.3252 17.6875 9.48047 17.6641 9.60352C17.6406 9.78516 17.541 9.90527 17.3652 9.96387C17.1953 10.0166 17.0254 9.9668 16.8555 9.81445C16.2285 9.23438 15.5957 8.80371 14.957 8.52246C14.3184 8.23535 13.6826 8.03613 13.0498 7.9248C12.417 7.81348 11.79 7.7373 11.1689 7.69629C10.5537 7.64941 9.94727 7.5791 9.34961 7.48535C8.75781 7.3916 8.18359 7.22168 7.62695 6.97559C7.07031 6.72949 6.54004 6.3457 6.03613 5.82422C5.90723 5.69531 5.78711 5.66895 5.67578 5.74512C5.56445 5.81543 5.53516 5.92383 5.58789 6.07031C5.83398 6.7207 6.19141 7.22754 6.66016 7.59082C7.13477 7.9541 7.68555 8.22949 8.3125 8.41699C8.93945 8.60449 9.61621 8.75977 10.3428 8.88281C11.0693 9 11.8135 9.14355 12.5752 9.31348C13.3428 9.4834 14.0957 9.73242 14.834 10.0605C15.5781 10.3887 16.2783 10.8545 16.9346 11.458C17.1572 11.6748 17.4209 11.959 17.7256 12.3105C18.0361 12.6562 18.335 13.0342 18.6221 13.4443C18.915 13.8486 19.1553 14.2471 19.3428 14.6396C19.5303 15.0322 19.624 15.3809 19.624 15.6855C19.624 16.0898 19.5039 16.4238 19.2637 16.6875C19.0234 16.957 18.7334 17.0918 18.3936 17.0918C18.2236 17.0918 18.0684 17.0449 17.9277 16.9512C17.7871 16.8574 17.6816 16.6992 17.6113 16.4766C17.418 15.8613 17.2217 15.3018 17.0225 14.7979C16.8291 14.2881 16.5977 13.8135 16.3281 13.374C16.0586 12.9287 15.7217 12.4951 15.3174 12.0732L16.627 12.1348C16.5391 12.2871 16.3926 12.4893 16.1875 12.7412C15.9883 12.9873 15.7217 13.2539 15.3877 13.541C15.0596 13.8281 14.6582 14.1006 14.1836 14.3584C13.7148 14.6104 13.167 14.8184 12.54 14.9824C11.9131 15.1465 11.2012 15.2285 10.4043 15.2285C8.89258 15.2285 7.51855 14.9678 6.28223 14.4463C5.05176 13.9189 3.99414 13.1689 3.10938 12.1963C2.23047 11.2236 1.55371 10.0605 1.0791 8.70703C0.604492 7.35352 0.367188 5.84473 0.367188 4.18066C0.367188 3.78223 0.384766 3.31641 0.419922 2.7832C0.460938 2.25 0.53125 1.75488 0.630859 1.29785Z"
                fill={fill}
            />
        </Svg>
    );
};

export default Vegan;
