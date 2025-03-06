import React, { useContext, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { UPDATE_VALUE_REGISTER } from 'src/store/actions'
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';
import ArrowDown from '../../../assets/svg/ArrowDown';
import RNPickerSelect from 'react-native-picker-select';

export default function Weight() {
    const { t } = useTranslation();
    const [weightUnit, setWeightUnit] = useState('kg');


    const formRegister = useSelector((state: AppState) => state.formRegister);
    const dispatch = useDispatch();
    const handleWeightChange = (value: string) => {
        setWeightUnit(value);
    };
    const handleChange = (text: string) => {
        const weight = parseInt(text, 10);

        if (!isNaN(weight)) {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    weight: weight,
                    weightUnit: weightUnit
                },
            });
        } else {
            dispatch({
                type: UPDATE_VALUE_REGISTER,
                payload: {
                    ...formRegister,
                    weight: 0,
                    weightUnit: weightUnit
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
                textHeaderStyle={{ textAlign: 'center' }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <TextInput
                        style={{
                            borderWidth: 0,
                            fontSize: 64,
                            textAlign: 'center',
                            color: palette.white,
                            flex: 1,
                        }}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor={palette.white064}
                        autoFocus={true}
                        onChangeText={handleChange}
                        value={formRegister?.weight ? formRegister.weight.toString() : ''}
                    />
                    <View>
                        <RNPickerSelect
                            value={weightUnit}
                            onValueChange={handleWeightChange}
                            placeholder={{}}
                            items={[
                                { label: 'kg', value: 'kg' },
                                { label: 'lb', value: 'lb' },
                            ]}
                            Icon={() => {
                                return <ArrowDown />;
                            }}
                            style={{
                                iconContainer: {
                                    position: 'absolute',
                                    right: 10,
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                inputIOSContainer: { width: 70 },
                                inputAndroidContainer: { width: 70 },
                                inputIOS: {
                                    height: 'auto',
                                    color: palette.white,
                                    fontFamily: families.geist,
                                    fontSize: 16,
                                    lineHeight: 24,
                                    paddingLeft: 12,
                                    paddingVertical: 6,
                                    backgroundColor: palette.white008,
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: palette.white,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                },
                                inputAndroid: {
                                    backgroundColor: palette.black,
                                    width: 70,
                                    height: 'auto',
                                    borderWidth: 1,
                                    borderColor: palette.white,
                                    color: palette.white,
                                    fontFamily: families.geist,
                                    fontSize: 16,
                                    lineHeight: 24,
                                    paddingLeft: 12,
                                    paddingVertical: 6,
                                },
                            }}
                        />
                    </View>
                </View>
            </QuestionnaireLayout>
        </BaseScreenLayout>
    );
}
