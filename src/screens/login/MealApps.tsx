import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Carousel from 'pinar';
import ModalDropdown from 'react-native-modal-dropdown';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import RadioButton from 'src/components/Form/RadioButton';

export default function MealApps() {
    const [selected, setSelected] = useState('');
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t, i18n} = useTranslation();

    const options = [
        {id: 'yes', label: t('yes')},
        {id: 'no', label: t('no')},
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout title={t('other-meal-apps')} imageBar={images.bar3} screenNavigate="Goal">
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
