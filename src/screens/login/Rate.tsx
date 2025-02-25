import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import PriceRow from 'src/components/PriceRow';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import ButtonForm from 'src/components/Form/ButtonForm';
import ContainerContext from 'src/ContainerContext';
import Check from '../../../assets/svg/Check';

export default function Rate() {
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
                justifyContent: 'space-between',
            }}>
                <View>
                    <HeaderProgressBar
                        title={t('try-for-free')}
                        description={t('you-wont-be-charged-anything-today')}
                        textHeaderStyle={{ textAlign: 'center' }}
                        textHeaderDescriptionStyle={{ textAlign: 'center' }}
                    />
                </View>
                <View>
                    <Image
                        style={{
                            resizeMode: 'cover',
                            marginBottom: 41
                        }}
                        source={images.exampleScreen}
                    />
                    <PriceRow prices={[
                        { type: t('yearly'), priceMouthly: 4.99, priceYearly: 59.88, save: 49, active: true },
                        { type: t('monthly'), priceMouthly: 9.99, priceYearly: 119.88 }]} />

                </View>
                <View>
                    <Text style={{ color: palette.white048, fontSize: 14, lineHeight: 20, fontFamily: 'Geist', textAlign: 'center' }}>
                        {t('text-pay', { yearlyPrice: 59.88, monthlyPrice: 9.99 })}
                    </Text>
                    <ButtonForm
                        text={t('try-for', { price: '0.00' })}
                        actionButton={() => navigator.navigate('SignUp')}
                        style={{ width: '100%', marginTop: 16 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                        <Check />
                        <Text
                            style={{
                                fontFamily: 'Geist',
                                fontSize: 14,
                                lineHeight: 20,
                                color: palette.white,
                                marginLeft: 8
                            }}
                        >
                            {t('no-payment-due-now')}
                        </Text>
                    </View>
                </View>
            </View>
        </BaseScreenLayout>
    );
}
