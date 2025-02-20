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
import RadioButton from 'src/components/Form/RadioButton';

export default function Accomplish() {
    const [selected, setSelected] = useState('');
    const di = useContext(ContainerContext);
    const {t} = useTranslation();

    const options = [
        {
            id: 'eat-and-live-healthier-and-longer',
            label: t('eat-and-live-healthier-and-longer'),
        },
        {id: 'boost-energy-and-mood', label: t('boost-energy-and-mood')},
        {
            id: 'quickly-cook-healthy-meals',
            label: t('quickly-cook-healthy-meals'),
        },
        {
            id: 'feel-better-about-my-body',
            label: t('feel-better-about-my-body'),
        },
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('what-youd-want-to-accomplish')}
                imageBar={images.bar8}
                screenNavigate="LoveRecipeAI">
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => setSelected(option.id)}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
