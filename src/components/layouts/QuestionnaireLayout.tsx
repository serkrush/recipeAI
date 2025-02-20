import React, {useContext} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import palette from 'src/theme/colors/palette';
import {families} from 'src/theme';
import ButtonForm from '../Form/ButtonForm';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BackButton from '../BackButton';

interface QuestionnaireLayoutProps {
    title?: string;
    description?: string;
    imageBar: string;
    screenNavigate: string;
    children?: React.ReactNode;
    backButton?: boolean;
    textHeaderStyle?: object;
}

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({
    title,
    description,
    imageBar,
    screenNavigate,
    children,
    backButton = true,
    textHeaderStyle = {},
}) => {
    const {t} = useTranslation();
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    {backButton && <BackButton style={styles.backButton} />}
                    <Image source={imageBar} />
                </View>
                <View style={textHeaderStyle}>
                    {title && (
                        <Text style={{...styles.title, ...textHeaderStyle}}>
                            {title}
                        </Text>
                    )}
                    {description && (
                        <Text style={styles.description}>{description}</Text>
                    )}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {children}
            </ScrollView>

            <View style={styles.footer}>
                <ButtonForm
                    text={t('continue')}
                    actionButton={() => navigator.navigate(screenNavigate)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
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
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 16,
    },
    footer: {
        paddingTop: 16,
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
});

export default QuestionnaireLayout;
