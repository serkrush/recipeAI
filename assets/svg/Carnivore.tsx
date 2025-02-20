import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Vegan = ({fill = '#FF33DD' as ColorValue, width = 24, height = 24}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M2.05312 8.28014C3.06809 5.4403 5.38992 3.50935 7.97577 3.49414L8.02243 3.71071C9.24135 9.36795 8.04996 15.3379 4.19589 18.4692C3.22695 17.4854 2.4524 16.1224 1.91075 14.3314C1.31802 12.3714 1.36792 10.1973 2.05312 8.28014Z"
                fill={fill}
            />
            <Path
                d="M6.55101 20.0133C6.30829 19.9207 6.07212 19.8146 5.84277 19.6946C7.46482 18.2583 8.62864 16.4267 9.38432 14.3893C11.067 14.1852 12.6786 14.023 14.2683 14.4015C15.7477 14.7537 17.2781 15.5966 18.7736 17.5212C16.9261 18.7324 14.7275 19.4902 13.0406 19.9499C10.8833 20.5379 8.58699 20.7904 6.55101 20.0133Z"
                fill={fill}
            />
            <Path
                d="M20.3426 16.2807C21.8176 14.8539 22.8025 12.9298 22.4167 10.4326L22.4088 10.3816L22.3957 10.3318C22.0166 8.88526 21.5218 7.84257 20.8523 7.13022C20.1506 6.38352 19.3421 6.08895 18.5447 5.97862C18.0334 5.90787 17.4471 5.91019 16.9278 5.91224C16.7276 5.91303 16.5374 5.91378 16.3653 5.91029C15.679 5.89638 15.0281 5.82869 14.3645 5.56899L10.1036 3.91766C10.618 6.6899 10.6172 9.60909 10.0029 12.304C11.4629 12.1479 13.0898 12.0649 14.7317 12.4559C16.6884 12.9217 18.5941 14.0364 20.3426 16.2807Z"
                fill={fill}
            />
        </Svg>
    );
};

export default Vegan;
