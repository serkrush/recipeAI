import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Carousel from 'pinar';
import ModalDropdown from 'react-native-modal-dropdown';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import WelcomeSliderItem from 'src/components/WelcomeSliderItem';
import ArrowDown from '../../../assets/svg/ArrowDown';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import {families} from 'src/theme';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import BackgroundView from 'src/components/BackgroundView';

export default function LoveRecipeAI() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t, i18n} = useTranslation();

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                    paddingHorizontal: 24,
                    paddingVertical: 46
                }}>
                    <BackgroundView source={images.loveRecipeAIBg} />
                <Text
                    style={{
                        color: palette.white,
                        fontFamily: families.geist,
                        fontSize: 34,
                        lineHeight: 44,
                        textAlign: 'center',
                        paddingHorizontal: 40,
                    }}>
                    {t('love-recipe-ai')}
                </Text>
                <Text
                    style={{
                        color: palette.white064,
                        fontFamily: families.geist,
                        fontSize: 18,
                        lineHeight: 26,
                        opacity: 0.8,
                        textAlign: 'center',
                        paddingHorizontal: 40,
                        marginTop: 8,
                    }}>
                    {t('recommend-others')}
                </Text>
                <ButtonForm
                    text={t('rate-us')}
                    actionButton={() => console.log('rate us')}
                    style={{width: '100%', marginTop: 41}}
                />
                <ButtonForm
                    text={t('no-thank-you')}
                    actionButton={() => navigator.navigate('Notifications')}
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        marginTop: 15,
                    }}
                    styleText={{color: palette.white}}
                />
            </View>
        </BaseScreenLayout>
    );
}
