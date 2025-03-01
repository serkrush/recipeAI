import React, {useContext, useEffect, useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import Carousel from 'pinar';
import ModalDropdown from 'react-native-modal-dropdown';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import WelcomeSliderItem from 'src/components/WelcomeSliderItem';
import ArrowDown from '../../../assets/svg/ArrowDown';
import {images} from 'src/theme/images';
import palette from 'src/theme/colors/palette';
import {families} from 'src/theme';
import {useActions} from 'src/hooks/useEntity';

export default function WelcomeScreen() {
    const [showSelect, setShowSelect] = useState(false);
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t} = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('EN');

    const handleLanguageChange = (index: number, value: string) => {
        setCurrentLanguage(value);

        if (value === 'EN') {
            i18next.changeLanguage('en');
        } else if (value === 'UA') {
            i18next.changeLanguage('ua');
        }
    };

    const {getRecipeAI} = useActions('Recipes');


    const [imageBase64, setImageBase64] = useState(null);
    
    const fetchRecipes = async () => {
        console.log('fetchRecipes 1');
        try {
            const imagePath = Platform.OS === 'android' ? 'img/example2.jpeg' : '../../assets/img/example2.jpeg';
            // await encodeImageToBase64(imagePath);
            // await encodeImageToBase64('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg');
            console.log('fetchRecipes 2', imageBase64);
            // if (!imageBase64) {
            //     console.error('imageBase64 is empty');
            //     return;
            // }
            getRecipeAI(imagePath);
            console.log('fetchRecipes 3s');
        } catch (error) {
            console.error('error OpenAI:', error);
        } finally {
            console.log('finish OpenAI:');
        }
    };

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <View style={{height: '100%'}}>
                <ModalDropdown
                    options={['EN', 'UA']}
                    defaultValue={currentLanguage}
                    onSelect={handleLanguageChange}
                    onDropdownWillShow={() => setShowSelect(true)}
                    onDropdownWillHide={() => setShowSelect(false)}
                    dropdownStyle={{
                        backgroundColor: palette.black,
                        width: 70,
                        height: 'auto',
                        borderWidth: 1,
                        borderColor: palette.white,
                    }}
                    dropdownTextStyle={{
                        backgroundColor: palette.white008,
                        color: palette.white,
                        fontFamily: families.geist,
                        fontSize: 16,
                        lineHeight: 24,
                        textAlign: 'center',
                        borderWidth: 0,
                    }}
                    style={{
                        backgroundColor: palette.white008,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: palette.white,
                        zIndex: 100,
                        position: 'absolute',
                        right: 24,
                        top: 29,
                        // ...(showSelect ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {  }),
                    }}
                    textStyle={{
                        color: palette.white,
                        fontFamily: families.geist,
                        fontSize: 16,
                        lineHeight: 24,
                        paddingLeft: 12,
                        paddingVertical: 6,
                    }}
                    renderRightComponent={() => (
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 6,
                            }}>
                            <ArrowDown />
                        </View>
                    )}
                />
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
                    <ButtonForm
                        text={'go main'}
                        actionButton={() => navigator.navigate('Tabs', { screen: 'Main' })}
                    />
                </View>
            </View>
        </BaseScreenLayout>
    );
}
