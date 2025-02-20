import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';

export default function Gender() {
    const [selected, setSelected] = useState('');
    const di = useContext(ContainerContext);
    const {t} = useTranslation();

    const options = [
        {id: 'male', label: t('male')},
        {id: 'famale', label: t('female')},
        {id: 'other', label: t('other')},
    ];

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-your-gender')}
                description={t('nutritional-tips')}
                imageBar={images.bar1}
                screenNavigate="Lifestyle"
                backButton={false}>
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
