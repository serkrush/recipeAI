import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import RadioButton from 'src/components/Form/RadioButton';
import LackOfConsistency from '../../../assets/svg/LackOfConsistency';
import DontLikeCooking from '../../../assets/svg/DontLikeCooking';
import UnhealthyEatingHabits from '../../../assets/svg/UnhealthyEatingHabits';
import LackOfSupport from '../../../assets/svg/LackOfSupport';
import LackOfFoodInspiration from '../../../assets/svg/LackOfFoodInspiration';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'src/constants';
import {UPDATE_VALUE_REGISTER} from 'src/store/actions';

export default function StoppingYou() {
    const formRegister = useSelector((state: AppState) => {
        return state.formRegister;
    });
    const [selected, setSelected] = useState(formRegister?.cause);
    const {t} = useTranslation();

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
    const dispatch = useDispatch();
    const handleSelect = (id: string) => {
        setSelected(id);
        dispatch({type: UPDATE_VALUE_REGISTER, payload: {cause: id}});
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-stopping-you')}
                imageBar={images.bar7}
                activeNextBtn={
                    formRegister?.cause && formRegister?.cause !== ''
                        ? true
                        : false
                }
                screenNavigate="SprcificDiet">
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
