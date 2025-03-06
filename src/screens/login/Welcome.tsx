import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Carousel from 'pinar';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import WelcomeSliderItem from 'src/components/WelcomeSliderItem';
import ArrowDown from '../../../assets/svg/ArrowDown';
import { images } from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';
import RNPickerSelect from 'react-native-picker-select';

export default function WelcomeScreen() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('enUS');

    const handleLanguageChange = (value: string) => {
        setCurrentLanguage(value);
        i18next.changeLanguage(value);
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View style={{ height: '100%', position: 'relative' }}>
                <View style={{
                    position: 'absolute',
                    zIndex: 11,
                    right: 24,
                    top: 29,
                }}>
                    <RNPickerSelect
                        value={currentLanguage}
                        onValueChange={handleLanguageChange}
                        placeholder={{}}
                        items={[
                            { label: 'EN', value: 'enUS' },
                            { label: 'UK', value: 'uk' },
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
                <Carousel
                    dotStyle={{
                        backgroundColor: palette.white,
                        width: 6,
                        height: 6,
                        borderRadius: 50,
                        opacity: 0.48,
                        marginHorizontal: 8,
                        marginBottom: 116,
                    }}
                    activeDotStyle={{
                        backgroundColor: palette.white,
                        width: 6,
                        height: 6,
                        borderRadius: 50,
                        marginHorizontal: 8,
                        marginBottom: 116,
                    }}
                    showsControls={false}
                    showsDots={true}>
                    <WelcomeSliderItem
                        image={images.welcome1}
                        title={t('welcome-title1')}
                        description={t('welcome-description1')}
                    />
                    <WelcomeSliderItem
                        image={images.welcome2}
                        title={t('welcome-title2')}
                        description={t('welcome-description2')}
                    />
                    <WelcomeSliderItem
                        image={images.welcome3}
                        title={t('welcome-title3')}
                        description={t('welcome-description3')}
                    />
                </Carousel>
                <View
                    style={{
                        paddingHorizontal: 24,
                        paddingBottom: 20,
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                    }}>
                    <ButtonForm
                        text={t('get-started')}
                        actionButton={() => navigator.navigate('Gender')}
                    />
                    {/* <ButtonForm
                        text={'go main111'}
                        // actionButton={() => navigator.navigate('Rate')}
                        actionButton={() => navigator.navigate('Tabs', { screen: 'Main' })}
                    /> */}
                </View>
            </View>
        </BaseScreenLayout>
    );
}
