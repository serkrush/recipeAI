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
import Classic from '../../../assets/svg/Classic';
import Pescatarian from '../../../assets/svg/Pescatarian';
import Vegetarian from '../../../assets/svg/Vegetarian';
import Vegan from '../../../assets/svg/Vegan';
import Carnivore from '../../../assets/svg/Carnivore';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import {families} from 'src/theme';
import RadioButton from 'src/components/Form/RadioButton';

export default function SprcificDiet() {
    const [selected, setSelected] = useState('');
    const {t, i18n} = useTranslation();

    const options = [
        {
            id: 'classic',
            label: t('classic'),
            icon: <Classic />,
        },
        {
            id: 'pescatarian',
            label: t('pescatarian'),
            icon: <Pescatarian />,
        },
        {
            id: 'vegetarian',
            label: t('vegetarian'),
            icon: <Vegetarian />,
        },
        {
            id: 'vegan',
            label: t('vegan'),
            icon: <Vegan />,
        },
        {
            id: 'carnivore',
            label: t('carnivore'),
            icon: <Carnivore />,
        },
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('specific-diet')}
                imageBar={images.bar7}
                screenNavigate="Accomplish">
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => setSelected(option.id)}
                            icon={option?.icon}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
