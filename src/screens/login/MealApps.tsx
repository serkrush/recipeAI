import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'src/constants';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';

export default function MealApps() {
    const [selected, setSelected] = useState('');
    const {t} = useTranslation();
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });

    const options = [
        {id: 'yes', label: t('yes')},
        {id: 'no', label: t('no')},
    ];
    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {mealApps: id}});
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('other-meal-apps')}
                imageBar={images.bar3}
                activeNextBtn={
                    formRegister?.mealApps && formRegister?.mealApps !== ''
                        ? true
                        : false
                }
                screenNavigate="Goal">
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
