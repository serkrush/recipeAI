import React, {useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { UPDATE_VALUE_REGISTER } from 'src/store/actions'
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import QuestionnaireLayout from 'src/components/layouts/QuestionnaireLayout';
import {images} from 'src/theme/images';
import Cutlery from '../../../assets/svg/Cutlery';
import palette from 'src/theme/colors/palette';
import ButtonForm from 'src/components/Form/ButtonForm';
import ContainerContext from 'src/ContainerContext';
import { families } from 'src/theme';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';

export default function ThankYou() {
    const {t} = useTranslation();
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

    const formRegister = useSelector((state: AppState) => state.formRegister);
    const dispatch = useDispatch();

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 24,
                paddingVertical: 20,
                justifyContent:'space-between'
            }}>
                <View>
                    <HeaderProgressBar
                    />
                </View>
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    flex: 1,
                }}>
                    <Cutlery />
                    <Text style={{
                        color: palette.white, 
                        fontFamily: families.geist,
                        fontSize: 34,
                        lineHeight: 44,
                        textAlign: 'center',
                        marginTop: 24,



                    }}>{t('all-done-thank-you')}</Text>
                </View>
                <View>

                <ButtonForm
                        style={{
                            width: '100%',
                        }}
                        text={t('see-my-recipes')}
                        actionButton={()=>navigator.navigate('Congratulations')} />
                </View>
            </View>
        </BaseScreenLayout>
    );
}
