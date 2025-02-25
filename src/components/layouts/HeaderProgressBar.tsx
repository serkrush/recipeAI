import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';
import ButtonForm from '../Form/ButtonForm';
import { useTranslation } from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BackButton from '../BackButton';

interface HeaderProgressBarProps {
    title?: string;
    description?: string;
    imageBar?: string;
    backButton?: boolean;
    textHeaderStyle?: object;
    textHeaderDescriptionStyle?: object;
    startScroll?: boolean;
}

const HeaderProgressBar: React.FC<HeaderProgressBarProps> = ({
    title,
    description,
    imageBar,
    backButton = true,
    textHeaderStyle = {},
    startScroll = false,
    textHeaderDescriptionStyle = {}
}) => {
    return (
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                {backButton && <BackButton style={styles.backButton} />}
                {!startScroll && imageBar && <Image source={imageBar} />}
                {startScroll && title && (
                    <Text style={{
                        fontFamily: families.geist500,
                        color: palette.white,
                        fontSize: 18,
                        lineHeight: 28
                    }}>
                        {title}
                    </Text>
                )}
            </View>
            <View>
                {!startScroll && title && (
                    <Text style={{ ...styles.title, ...textHeaderStyle }}>
                        {title}
                    </Text>
                )}
                {description && (
                    <Text style={{ ...styles.description, ...textHeaderDescriptionStyle }}>{description}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        paddingBottom: 16,
    },
    imageContainer: {
        position: 'relative',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: palette.white,
        fontFamily: families.geist,
        fontSize: 34,
        lineHeight: 44,
        marginTop: 41,
    },
    description: {
        color: palette.grey,
        fontFamily: families.geist,
        fontSize: 18,
        lineHeight: 26,
        marginTop: 8,
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
});

export default HeaderProgressBar;
