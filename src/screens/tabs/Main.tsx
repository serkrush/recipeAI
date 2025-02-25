import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'pinar';
import ModalDropdown from 'react-native-modal-dropdown';
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
import { useActions } from 'src/hooks/useEntity';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { useSelector } from 'react-redux';
import { AppState } from 'src/constants';

export default function Main() {
    const [showSelect, setShowSelect] = useState(false);
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const { t, i18n } = useTranslation();

    const { getRecipeAI } = useActions('Recipes');

    const formRegister = useSelector((state: AppState) => {
        // console.log('state !!!!!!!', state)
        return state.formRegister;
    });

return (
    <BaseScreenLayout
        containerStyle={{
            paddingHorizontal: 0,
            paddingVertical: 0,
        }}>
            
            <ButtonForm text={'add photo'} actionButton={()=>navigator.navigate('RecipesList')} />
    </BaseScreenLayout>
);
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    controls: { flexDirection: 'row', justifyContent: 'center', padding: 20 },
    button: { marginHorizontal: 10, padding: 15, backgroundColor: '#000', borderRadius: 10 },
    text: { color: '#fff', fontSize: 16 },
});
