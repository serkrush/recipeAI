import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';
import { AppState } from 'src/constants';

export default function Gender() {
    const [selected, setSelected] = useState('');
    const {t} = useTranslation();
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });

    const options = [
        {id: 'male', label: t('male')},
        {id: 'famale', label: t('female')},
        {id: 'other', label: t('other')},
    ];

    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {gender: id}});
    };

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
                activeNextBtn={
                    formRegister?.gender && formRegister?.gender !== ''
                        ? true
                        : false
                }
                backButton={false}>
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => handleSelect(option.id)}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
