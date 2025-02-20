import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import palette from 'src/theme/colors/palette';
import BackgroundView from './BackgroundView';
import { families } from 'src/theme';

interface WelcomeSliderItemProps {
    image: string;
    title: string;
    description: string;
}

export default function WelcomeSliderItem({
    image,
    title,
    description,
}: WelcomeSliderItemProps) {
    return (
        <View
            style={{
                paddingHorizontal: 24,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 186
            }}>
            <BackgroundView source={image} />
            <Text
                style={styles.title}>
                {title}
            </Text>
            <Text
                style={styles.description}>
                {description}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: families.geist,
        fontSize: 34,
        lineHeight: 44,
        textAlign: 'center',
        letterSpacing: -0.03 * 34,
        color: palette.white,
    },
    description: {
        fontFamily: families.geist,
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: -0.02 * 18,
        color: palette.white,
        opacity: 0.64,
        marginTop: 8
    },
});
