import React, {useContext} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import palette from 'src/theme/colors/palette';
import {families} from 'src/theme';
import ButtonForm from '../Form/ButtonForm';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BackButton from '../BackButton';
import HeaderProgressBar from './HeaderProgressBar';

interface QuestionnaireLayoutProps {
    title?: string;
    description?: string;
    imageBar?: string;
    screenNavigate: string;
    children?: React.ReactNode;
    backButton?: boolean;
    textHeaderStyle?: object;
    textHeaderDescriptionStyle?: object;
    activeNextBtn?: boolean;
}

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({
    title,
    description,
    imageBar,
    screenNavigate,
    children,
    backButton = true,
    textHeaderStyle = {},
    textHeaderDescriptionStyle = {},
    activeNextBtn = true,
}) => {
    const {t} = useTranslation();
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

    return (
        <View style={styles.container}>
            <HeaderProgressBar
                title={title}
                description={description}
                imageBar={imageBar}
                backButton={backButton}
                textHeaderStyle={textHeaderStyle}
                textHeaderDescriptionStyle={textHeaderDescriptionStyle}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {children}
            </ScrollView>

            <View style={styles.footer}>
                <ButtonForm
                    text={t('continue')}
                    style={{opacity: activeNextBtn ? 1 : 0.2}}
                    actionButton={() => activeNextBtn && navigator.navigate(screenNavigate)}
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
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 16,
    },
    footer: {
        paddingTop: 16,
    },
});

export default QuestionnaireLayout;
