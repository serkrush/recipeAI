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

export default function LoveRecipeAI() {
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
                justifyContent: 'space-between'
            }}>
                <BackgroundView source={images.loveRecipeAIBg} />
                <View>
                    <HeaderProgressBar
                        imageBar={images.bar10}
                    />
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
                        {t('love-recipe-ai')}
                    </Text>
                    <Text
                        style={{
                            color: palette.white064,
                            fontFamily: families.geist,
                            fontSize: 18,
                            lineHeight: 26,
                            opacity: 0.8,
                            textAlign: 'center',
                            paddingHorizontal: 40,
                            marginTop: 8,
                        }}>
                        {t('recommend-others')}
                    </Text>
                    <ButtonForm
                        text={t('rate-us')}
                        actionButton={() => console.log('rate us')}
                        style={{ width: '100%', marginTop: 41 }}
                    />
                    <ButtonForm
                        text={t('no-thank-you')}
                        actionButton={() => navigator.navigate('Notifications')}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                        }}
                        styleText={{ color: palette.white }}
                    />
                </View>

            </View>
        </BaseScreenLayout>
    );
}
