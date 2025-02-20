import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const LackOfFoodInspiration = ({
    fill = '#FF33DD' as ColorValue,
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
                d="M3.90039 19.2676C3.69531 19.1152 3.56934 18.9102 3.52246 18.6523C3.48145 18.4004 3.51953 18.1016 3.63672 17.7559L5.44727 12.3857L0.833008 9.07227C0.53418 8.86133 0.326172 8.6416 0.208984 8.41309C0.0917969 8.17871 0.0742188 7.93848 0.15625 7.69238C0.238281 7.45215 0.393555 7.27344 0.62207 7.15625C0.850586 7.03906 1.14941 6.98047 1.51855 6.98047H7.16992L8.89258 1.61914C9.00391 1.26758 9.15039 1.00098 9.33203 0.819336C9.51953 0.631836 9.73926 0.538086 9.99121 0.538086C10.249 0.538086 10.4688 0.631836 10.6504 0.819336C10.8379 1.00098 10.9873 1.26758 11.0986 1.61914L12.8213 6.98047H18.4727C18.8418 6.98047 19.1406 7.03906 19.3691 7.15625C19.5977 7.27344 19.7529 7.45215 19.835 7.69238C19.917 7.93848 19.8994 8.17871 19.7822 8.41309C19.665 8.6416 19.457 8.86133 19.1582 9.07227L14.5439 12.3857L16.3545 17.7559C16.4717 18.1016 16.5068 18.4004 16.46 18.6523C16.4189 18.9102 16.2959 19.1152 16.0908 19.2676C15.8857 19.4316 15.6543 19.4902 15.3965 19.4434C15.1387 19.3965 14.8633 19.2676 14.5703 19.0566L9.99121 15.6904L5.4209 19.0566C5.12793 19.2676 4.85254 19.3965 4.59473 19.4434C4.33691 19.4902 4.10547 19.4316 3.90039 19.2676Z"
                fill={fill}
            />
        </Svg>
    );
};

export default LackOfFoodInspiration;
