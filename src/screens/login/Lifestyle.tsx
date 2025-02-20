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
import Active from '../../../assets/svg/Active';
import Athlete from '../../../assets/svg/Athlete';
import Seddantery from '../../../assets/svg/Seddantery';
import RadioButton from 'src/components/Form/RadioButton';

export default function Lifestyle() {
    const [selected, setSelected] = useState('');
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t, i18n} = useTranslation();

    const options = [
        {
            id: 'seddantery',
            label: t('seddantery'),
            subLabel: t('seddantery-text'),
            icon: <Seddantery />,
        },
        {
            id: 'active',
            label: t('active'),
            subLabel: t('active-text'),
            icon: <Active />,
        },
        {
            id: 'athlete',
            label: t('athlete'),
            subLabel: t('athlete-text'),
            icon: <Athlete />,
        },
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('lifestyle')}
                description={t('lifestyle-description')}
                imageBar={images.bar2}
                screenNavigate="MealApps">
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => setSelected(option.id)}
                            subLabel={option.subLabel}
                            icon={option.icon}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
