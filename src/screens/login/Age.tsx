import React, {useContext, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
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

export default function Age() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t} = useTranslation();

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-your-age')}
                description={t('whats-your-age-description')}
                imageBar={images.bar6}
                screenNavigate="Weight"
                textHeaderStyle={{textAlign: 'center'}}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <TextInput
                        style={{
                            borderWidth: 0,
                            fontSize: 64,
                            textAlign: 'center',
                            color: palette.white,
                        }}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor={palette.white064}
                        autoFocus={true}
                    />
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
