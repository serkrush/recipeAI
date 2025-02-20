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
import LackOfConsistency from '../../../assets/svg/LackOfConsistency';
import DontLikeCooking from '../../../assets/svg/DontLikeCooking';
import UnhealthyEatingHabits from '../../../assets/svg/UnhealthyEatingHabits';
import LackOfSupport from '../../../assets/svg/LackOfSupport';
import LackOfFoodInspiration from '../../../assets/svg/LackOfFoodInspiration';

export default function StoppingYou() {
    const [selected, setSelected] = useState('');
    const {t, i18n} = useTranslation();

    const options = [
        {
            id: 'lack-of-consistency',
            label: t('lack-of-consistency'),
            icon: <LackOfConsistency />,
        },
        {
            id: 'dont-like-cooking',
            label: t('dont-like-cooking'),
            icon: <DontLikeCooking />,
        },
        {
            id: 'unhealthy-eating-habits',
            label: t('unhealthy-eating-habits'),
            icon: <UnhealthyEatingHabits />,
        },
        {
            id: 'lack-of-support',
            label: t('lack-of-support'),
            icon: <LackOfSupport />,
        },
        {
            id: 'lack-of-food-inspiration',
            label: t('lack-of-food-inspiration'),
            icon: <LackOfFoodInspiration />,
        },
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-stopping-you')}
                imageBar={images.bar6}
                screenNavigate="SprcificDiet">
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
