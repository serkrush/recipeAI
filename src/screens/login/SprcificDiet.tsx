import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import Classic from '../../../assets/svg/Classic';
import Pescatarian from '../../../assets/svg/Pescatarian';
import Vegetarian from '../../../assets/svg/Vegetarian';
import Vegan from '../../../assets/svg/Vegan';
import Carnivore from '../../../assets/svg/Carnivore';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'src/constants';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';

export default function SprcificDiet() {
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });
    const [selected, setSelected] = useState(formRegister?.diet);
    const {t} = useTranslation();

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

    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {diet: id}});
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('specific-diet')}
                imageBar={images.bar8}
                activeNextBtn={
                    formRegister?.diet && formRegister?.diet !== ''
                        ? true
                        : false
                }
                screenNavigate="Accomplish">
                <View style={{gap: 8}}>
                    {options.map(option => (
                        <RadioButton
                            key={option.id}
                            label={option.label}
                            selected={selected === option.id}
                            onPress={() => handleSelect(option.id)}
                            icon={option?.icon}
                        />
                    ))}
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
