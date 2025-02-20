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
import LoseWeight from '../../../assets/svg/LoseWeight';
import BeMoreHealthy from '../../../assets/svg/BeMoreHealthy';
import GainWeight from '../../../assets/svg/GainWeight';
import MaintainWeight from '../../../assets/svg/MaintainWeight';
import Other from '../../../assets/svg/Other';
import RadioButton from 'src/components/Form/RadioButton';

export default function Goal() {
    const [selected, setSelected] = useState('');
    const {t, i18n} = useTranslation();

    const options = [
        {
            id: 'lose-weight',
            label: t('lose-weight'),
            icon: <LoseWeight />,
        },
        {
            id: 'be-more-healthy',
            label: t('be-more-healthy'),
            icon: <BeMoreHealthy />,
        },
        {
            id: 'gain-weight',
            label: t('gain-weight'),
            icon: <GainWeight />,
        },
        {
            id: 'maintain-weight',
            label: t('maintain-weight'),
            icon: <MaintainWeight />,
        },
        {
            id: 'other',
            label: t('other'),
            icon: <Other />,
        },
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('your-goal')}
                description={t('your-goal-description')}
                imageBar={images.bar4}
                screenNavigate="Age">
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
