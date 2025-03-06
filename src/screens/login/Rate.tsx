import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import PriceRow from 'src/components/PriceRow';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import ButtonForm from 'src/components/Form/ButtonForm';
import ContainerContext from 'src/ContainerContext';
import Check from '../../../assets/svg/Check';
import Bell from '../../../assets/svg/Bell';
import Star from '../../../assets/svg/Star';
import LinearGradient from 'react-native-linear-gradient';
import { families } from 'src/theme';

export default function Rate() {
    const { t } = useTranslation();
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

    return (
        <BaseScreenLayout containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}>
            <View style={styles.container}>
                <HeaderProgressBar
                    title={t('try-for-free')}
                    description={t('you-wont-be-charged-anything-today')}
                    textHeaderStyle={{ textAlign: 'center' }}
                    textHeaderDescriptionStyle={{ textAlign: 'center' }}
                />
                <ScrollView>
                    <Image style={styles.image} source={images.exampleScreen} />
                    <PriceRow prices={[
                        { type: t('yearly'), priceMouthly: 4.99, priceYearly: 59.88, save: 49, active: true },
                        { type: t('monthly'), priceMouthly: 9.99, priceYearly: 119.88 }
                    ]} />
                    <View style={styles.gradientContainer}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.16)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={styles.gradient}
                        >
                            <View style={styles.iconWrapper}>
                                <View style={styles.iconBackground}>
                                    <Check fill={palette.black} />
                                </View>
                            </View>
                            <View style={styles.iconWrapper}>
                                <View style={styles.iconBackgroundSecondary}>
                                    <Bell />
                                </View>
                            </View>
                            <View style={styles.iconWrapper}>
                                <View style={styles.iconBackgroundSecondary}>
                                    <Star />
                                </View>
                            </View>
                        </LinearGradient>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.iconText}>{t('today-get-your-recipes')}</Text>
                                <Text style={styles.subText}>{t('you-successfully-started-your-journey')}</Text>
                            </View>
                            <View>
                                <Text style={styles.iconText}>{t('day-6-get-a-reminder')}</Text>
                                <Text style={styles.subText}>{t('see-your-first-results')}</Text>
                            </View>
                            <View>
                                <Text style={styles.iconText}>{t('day-7-trial-ends')}</Text>
                                <Text style={styles.subText}>{t('your-subscription-will-start-on-day-7')}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <Text style={styles.footerText}>
                        {t('text-pay', { yearlyPrice: 59.88, monthlyPrice: 9.99 })}
                    </Text>
                    <ButtonForm
                        text={t('try-for', { price: '0.00' })}
                        actionButton={() => navigator.navigate('SignUp')}
                        style={styles.button}
                    />
                    <View style={styles.footerCheckContainer}>
                        <Check />
                        <Text style={styles.footerCheckText}>{t('no-payment-due-now')}</Text>
                    </View>
                </View>
            </View>
        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    image: {
        resizeMode: 'cover',
        marginBottom: 41,
    },
    gradientContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
        paddingVertical: 4,
        marginTop: 40,
        marginBottom: 63,
    },
    gradient: {
        gap: 40,
        borderRadius: 100,
        paddingVertical: 4,
    },
    iconWrapper: {
        paddingHorizontal: 4,
    },
    iconBackground: {
        backgroundColor: palette.white,
        borderRadius: 100,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBackgroundSecondary: {
        backgroundColor: palette.white024,
        borderRadius: 100,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        gap: 30,
    },
    iconText: {
        color: palette.white,
        fontFamily: families.geist500,
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 28,
    },
    subText: {
        color: palette.white048,
        fontFamily: families.geist,
        fontSize: 14,
        lineHeight: 20,
    },
    footerText: {
        color: palette.white048,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'Geist',
        textAlign: 'center',
    },
    button: {
        width: '100%',
        marginTop: 16,
    },
    footerCheckContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    footerCheckText: {
        fontFamily: 'Geist',
        fontSize: 14,
        lineHeight: 20,
        color: palette.white,
        marginLeft: 8,
    },
});