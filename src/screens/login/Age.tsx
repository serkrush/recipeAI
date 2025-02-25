import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { UPDATE_VALUE_REGISTER } from 'src/store/actions';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';

export default function Age() {
    const { t } = useTranslation();
    const formRegister = useSelector((state: AppState) => state.formRegister);
    const dispatch = useDispatch();

    const handleAgeChange = (text: string) => {
        const age = parseInt(text, 10);

        if (!isNaN(age)) {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    age: age,
                },
            });
        } else {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    age: 0,
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
                title={t('whats-your-age')}
                description={t('whats-your-age-description')}
                imageBar={images.bar5}
                activeNextBtn={!!formRegister?.age && formRegister.age > 0}
                screenNavigate="Weight"
                textHeaderDescriptionStyle={{ textAlign: 'center' }}
                textHeaderStyle={{ textAlign: 'center' }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <Text>{formRegister?.age?.toString()}</Text>
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
                        onChangeText={handleAgeChange}
                        value={formRegister?.age ? formRegister.age.toString() : ''}
                    />
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}