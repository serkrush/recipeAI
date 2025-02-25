import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';
import ContainerContext from 'src/ContainerContext';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import { images } from 'src/theme/images';

export default function Notifications() {
    const { t } = useTranslation();
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

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
                justifyContent: 'space-between'
            }}>
                <View>
                    <HeaderProgressBar
                        imageBar={images.bar11}
                        title={t('cook-better-with-notifications')}
                        textHeaderStyle={{ textAlign: 'center' }}
                    />
                </View>

                <View>
                    <ButtonForm
                        text={t('click-allow')}
                        actionButton={() => navigator.navigate('ThankYou')}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                        }}
                        styleText={{ color: palette.white }}
                    />
                    <Text
                        style={{
                            color: palette.white064,
                            fontFamily: families.geist,
                            fontSize: 14,
                            lineHeight: 20,
                            opacity: 0.8,
                            textAlign: 'center',
                            marginTop: 4,
                        }}>
                        {t('stay-updated-on-cooking-times')}
                    </Text>
                </View>
            </View>
        </BaseScreenLayout>
    );
}
