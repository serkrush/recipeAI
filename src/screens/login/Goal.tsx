import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import LoseWeight from '../../../assets/svg/LoseWeight';
import BeMoreHealthy from '../../../assets/svg/BeMoreHealthy';
import GainWeight from '../../../assets/svg/GainWeight';
import MaintainWeight from '../../../assets/svg/MaintainWeight';
import Other from '../../../assets/svg/Other';
import RadioButton from 'src/components/Form/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'src/constants';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';

export default function Goal() {
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });
    const [selected, setSelected] = useState(formRegister?.goal);
    const {t} = useTranslation();

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
    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {goal: id}});
    };

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
                activeNextBtn={
                    formRegister?.goal && formRegister?.goal !== ''
                        ? true
                        : false
                }
                screenNavigate="Age">
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
