import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';
import BackgroundView from 'src/components/BackgroundView';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import Google from '../../../assets/svg/Google';
import Apple from '../../../assets/svg/Apple';

export default function SignUp() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const { t } = useTranslation();

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
                justifyContent: 'space-between',
            }}>
                <BackgroundView source={images.createAccount} />
                <View>
                    <HeaderProgressBar />
                </View>
                <View>
                    <Text
                        style={{
                            color: palette.white,
                            fontFamily: families.geist,
                            fontSize: 34,
                            lineHeight: 44,
                            textAlign: 'center',
                            paddingHorizontal: 40,
                        }}>
                        {t('create-account')}
                    </Text>
                    <Text
                        style={{
                            color: palette.white064,
                            fontFamily: families.geist,
                            fontSize: 18,
                            lineHeight: 26,
                            opacity: 0.8,
                            textAlign: 'center',
                            marginTop: 8,
                        }}>
                        {t('create-account-description')}
                    </Text>
                    <ButtonForm
                        icon={<Apple />}
                        text={t('continue-with-apple')}
                        actionButton={() => navigator.navigate('Tabs', { screen: 'Main' })}
                        style={{
                            width: '100%',
                            marginTop: 41, 
                            backgroundColor: palette.white,
                            borderRadius: 100,
                        }}
                    />
                    <ButtonForm
                        icon={<Google />}
                        text={t('continue-with-google')}
                        actionButton={() => navigator.navigate('Tabs', { screen: 'Main' })}
                        style={{
                            width: '100%',
                            backgroundColor: palette.white008,
                            marginTop: 15,
                            borderRadius: 28,
                        }}
                        styleText={{ color: palette.white }}
                    />
                </View>

            </View>
        </BaseScreenLayout>
    );
}
