import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path, LinearGradient, Defs, Stop } from 'react-native-svg';

const ArrowDesign = ({
    width = 76,
    height = 172,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 76 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Defs>
                <LinearGradient
                    id="paint0_linear_1_1034"
                    x1="50.2877"
                    y1="169"
                    x2="-33.8052"
                    y2="30.9647"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset="0.498371" stopColor="#FF33DD" />
                    <Stop offset="0.89743" stopColor="#FF33DD" stopOpacity="0" />
                </LinearGradient>
            </Defs>
            <Path
                d="M0.841513 169.987C0.296209 169.9 -0.0748909 169.387 0.0126389 168.842L1.43902 159.955C1.52655 159.41 2.03956 159.039 2.58487 159.126C3.13017 159.214 3.50127 159.727 3.41374 160.272L2.14585 168.171L10.0447 169.439C10.59 169.527 10.9611 170.04 10.8736 170.585C10.7861 171.13 10.2731 171.501 9.72776 171.414L0.841513 169.987ZM18.4051 0.0283356C50.1852 7.75929 74.1309 29.9289 75.8958 60.5288C77.6574 91.0702 57.28 129.523 1.5861 169.81L0.413897 168.19C55.9014 128.052 75.6019 90.1655 73.8991 60.6439C72.1998 31.1808 49.1392 9.56317 17.9324 1.97166L18.4051 0.0283356Z"
                fill="url(#paint0_linear_1_1034)"
            />
        </Svg>
    );
};

export default ArrowDesign;