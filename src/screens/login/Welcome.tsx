import React, {useContext, useMemo} from 'react';
import {colors, fonts} from 'src/theme';
import Carousel from 'pinar';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import {useTranslation} from 'react-i18next';
import BackgroundView from 'src/components/BackgroundView';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import ButtonForm from 'src/components/Form/ButtonForm';
import WelcomeSliderItem from 'src/components/WelcomeSliderItem';

export default function WelcomeScreen() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t} = useTranslation();
    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View style={{height: '100%'}}>
                <Carousel
                    dotStyle={{
                        backgroundColor: palette.white,
                        width: 6,
                        height: 6,
                        borderRadius: 50,
                        opacity: 0.48,
                        marginHorizontal: 8,
                        marginBottom: 116
                    }}
                    activeDotStyle={{
                        backgroundColor: palette.white,
                        width: 6,
                        height: 6,
                        borderRadius: 50,
                        marginHorizontal: 8,
                        marginBottom: 116
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
                        text="test"
                        actionButton={() => console.log('1')}
                    />
                </View>
            </View>
        </BaseScreenLayout>
    );
}
