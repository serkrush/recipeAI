import React, { useContext, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { UPDATE_VALUE_REGISTER } from 'src/store/actions';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import { images } from 'src/theme/images';
import ArrowDesign from '../../../assets/svg/ArrowDesign';
import H1RowWithImage from 'src/components/H1RowWithImage';
import Routine from '../../../assets/svg/Routine';
import Photo from '../../../assets/svg/Photo';
import Bubbles from '../../../assets/svg/Bubbles';
import Fire from '../../../assets/svg/Fire';
import ButtonForm from 'src/components/Form/ButtonForm';
import ContainerContext from 'src/ContainerContext';
import { families } from 'src/theme';
import palette from 'src/theme/colors/palette';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';

export default function Congratulations() {

    const [scroll, setScroll] = useState(false);
    const [reachedBottom, setReachedBottom] = useState(false);
    const { t } = useTranslation();

    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY > 0.1) {
            setScroll(true); // Change to a different color
        } else {
            setScroll(false); // Reset to transparent
        }
    };
    const handleScrollEnd = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        setReachedBottom(isBottom);
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View style={{
                position: 'absolute',
                zIndex: 1,
                width: '100%',
                paddingHorizontal: 24,
                backgroundColor: scroll ? palette.black2 : 'transparent',
                paddingTop: 20,
            }}>
                <HeaderProgressBar
                    title='Congratulations'
                    textHeaderStyle={{ width: '100%', textAlign: 'center', }}
                    headerStyle={{ paddingHorizontal: 24, paddingLeft: 24 }}
                    startScroll={scroll}
                />
            </View>
            <ScrollView onScroll={handleScroll} onMomentumScrollEnd={handleScrollEnd} scrollEventThrottle={16}>
                <Image
                    style={{
                        resizeMode: 'cover',
                    }}
                    source={images.congratulations}
                />
                <View style={{ paddingHorizontal: 20, marginTop: -160 }}>
                    <View style={{ position: 'relative' }}>
                        <View>
                            <Text style={{
                                position: 'relative', fontFamily: families.geist500, fontSize: 24,
                                lineHeight: 28, color: palette.white,
                            }}>
                                {t('how-to-reach-your-goals')}

                            </Text>
                            <View style={{ position: 'absolute', right: 0, top: -155 }}>
                                <ArrowDesign />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <H1RowWithImage icon={<Routine />} label={t('use-health-scores-to-improve-your-routine')} />
                        <H1RowWithImage icon={<Photo />} label={t('track-your-food')} />
                        <H1RowWithImage icon={<Fire />} label={t('follow-daily-calorie-recommendation')} />
                        <H1RowWithImage icon={<Bubbles />} label={t('balance-your-carbs-proteins-and-fat')} />
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <Text style={{
                            fontFamily: families.geist,
                            fontSize: 14,
                            lineHeight: 20,
                            color: palette.white,
                        }}>{t('plan-based')}</Text>
                        <View style={{ marginTop: 8 }}>
                            <Text style={{
                                fontFamily: families.geist,
                                fontSize: 14,
                                lineHeight: 20,
                                color: palette.white024,
                            }}>→ {t('basal-metabolic-rate')}</Text>
                            <Text style={{
                                fontFamily: families.geist,
                                fontSize: 14,
                                lineHeight: 20,
                                color: palette.white024,
                            }}>→ {t('calorie-counting-harvard')}</Text>
                            <Text style={{
                                fontFamily: families.geist,
                                fontSize: 14,
                                lineHeight: 20,
                                color: palette.white024,
                            }}>→ {t('international-society-of-aports-nutrition')}</Text>
                            <Text style={{
                                fontFamily: families.geist,
                                fontSize: 14,
                                lineHeight: 20,
                                color: palette.white024,
                            }}>→ {t('national-institutes-of-health')}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{backgroundColor:reachedBottom ? 'transparent' : palette.darkCharcoal064, padding: 20}}>
            <ButtonForm
                text={t('next')}
                actionButton={() => navigator.navigate('Rate')}
            />
            </View>
        </BaseScreenLayout>
    );
}