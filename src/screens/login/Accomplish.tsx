import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';
import { AppState } from 'src/constants';

export default function Accomplish() {
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });
    const [selected, setSelected] = useState(formRegister?.accomplish);
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
    
    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {accomplish: id}});
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('what-youd-want-to-accomplish')}
                imageBar={images.bar9}
                activeNextBtn={
                    formRegister?.accomplish && formRegister?.accomplish !== ''
                        ? true
                        : false
                }
                screenNavigate="LoveRecipeAI">
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
