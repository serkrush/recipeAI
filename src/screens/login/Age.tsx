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

    // Функция для обработки изменения текста
    const handleAgeChange = (text: string) => {
        // Преобразуем текст в число
        const age = parseInt(text, 10);

        // Проверяем, что введенное значение является числом
        if (!isNaN(age)) {
            // Обновляем значение age в formRegister через dispatch
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister, // Сохраняем остальные значения формы
                    age: age, // Обновляем age
                },
            });
        } else {
            // Если введенное значение не является числом, сбрасываем age в 0
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    age: 0,
                },
            });
        }
    };
    console.log('formRegister.age', formRegister.age)
    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <QuestionnaireLayout
                title={t('whats-your-age')}
                description={t('whats-your-age-description')}
                imageBar={images.bar6}
                activeNextBtn={!!formRegister?.age && formRegister.age > 0}
                screenNavigate="Weight"
                textHeaderStyle={{ textAlign: 'center' }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    {/* Отображаем age как строку */}
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
                        onChangeText={handleAgeChange} // Используем handleAgeChange
                        value={formRegister?.age ? formRegister.age.toString() : ''} // Устанавливаем значение
                    />
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}