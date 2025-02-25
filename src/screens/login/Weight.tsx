import React, {useContext} from 'react';
import {TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { UPDATE_VALUE_REGISTER } from 'src/store/actions'
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';

export default function Weight() {
    const {t} = useTranslation();

    const formRegister = useSelector((state: AppState) => state.formRegister);
    const dispatch = useDispatch();

    const handleChange = (text: string) => {
        const weight = parseInt(text, 10);

        if (!isNaN(weight)) {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    weight: weight,
                },
            });
        } else {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    weight: 0,
                },
            });
        }
    };
    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-your-weight')}
                imageBar={images.bar6}
                activeNextBtn={!!formRegister?.weight && formRegister.weight > 0}
                screenNavigate="StoppingYou"
                textHeaderStyle={{textAlign: 'center'}}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <TextInput
                        style={{
                            borderWidth: 0,
                            fontSize: 64,
                            textAlign: 'center',
                            color: palette.white,
                        }}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor={palette.white064}
                        autoFocus={true}
                        onChangeText={handleChange}
                        value={formRegister?.weight ? formRegister.weight.toString() : ''}
                    />
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
