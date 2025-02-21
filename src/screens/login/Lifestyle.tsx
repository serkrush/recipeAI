import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import Active from '../../../assets/svg/Active';
import Athlete from '../../../assets/svg/Athlete';
import Seddantery from '../../../assets/svg/Seddantery';
import RadioButton from 'src/components/Form/RadioButton';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import { AppState } from 'src/constants';

export default function Lifestyle() {
    const [selected, setSelected] = useState('');
    const {t} = useTranslation();
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });

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
    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {lifestyle: id}});
    };

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
                activeNextBtn={
                    formRegister?.lifestyle && formRegister?.lifestyle !== ''
                        ? true
                        : false
                }
                screenNavigate="MealApps">
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => handleSelect(option.id)}
                            subLabel={option.subLabel}
                            icon={option.icon}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
