import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
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

export default function Settings() {
    const [showSelect, setShowSelect] = useState(false);
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const {t, i18n} = useTranslation();

    const {getRecipeAI} = useActions('Recipes');



    const fetchRecipes = async () => {
        console.log('fetchRecipes 1');
        try {
            console.log('fetchRecipes 2');
            getRecipeAI();
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
                            <Text style={{color:'red'}}>Settings</Text>
            
        </BaseScreenLayout>
    );
}
