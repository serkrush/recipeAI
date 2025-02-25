import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ContainerContext from 'src/ContainerContext';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import ButtonForm from 'src/components/Form/ButtonForm';
import WeekDays from 'src/components/WeekDays';
import Cook from '../../../assets/svg/Cook';
import FireFull from '../../../assets/svg/FireFull';
import { AppState } from 'src/constants';
import { useActions } from 'src/hooks/useEntity';
import palette from 'src/theme/colors/palette';
import { families } from 'src/theme';

export default function Main() {
    const [showSelect, setShowSelect] = useState(false);
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const { t } = useTranslation();
    const { getRecipeAI } = useActions('Recipes');
    // useEffect(() => {
    //     const requestCameraPermission = async () => {
    //         const cameraPermission = await Camera.requestCameraPermission();
    //         if (cameraPermission === 'denied') {
    //             console.error('Camera permission denied');
    //         }
    //     };

    //     requestCameraPermission();
    // }, []);

    const formRegister = useSelector((state: AppState) => state.formRegister);
    const recipes = useSelector((state: AppState) => state.recipes);
    const recipesValues = Object.values(recipes);
    const recipesGeneric = recipesValues.filter(recipe => recipe.type === 'generic')
    useEffect(() => {
        if (recipesGeneric.length === 0) {
            console.log('FETCH!!!!!!!!!!!!!!!!')
        }
    }, [recipesGeneric]);

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 24,
                paddingVertical: 20,
            }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Cook />
                    <Text style={styles.headerText}>{t('recipe-ai')}</Text>
                </View>
                <View style={styles.headerRight}>
                    <FireFull />
                    <Text style={styles.fireCount}>0</Text>
                </View>
            </View>

            <WeekDays />
            <Text style={styles.recipesText}>{t('recipes-for-you')}</Text>

        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingTop: 29,
        paddingBottom: 19,
    },
    headerText: {
        fontFamily: families.geist500,
        fontSize: 28,
        lineHeight: 36,
        color: palette.white,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 100,
        backgroundColor: palette.white008,
        borderWidth: 1,
        borderColor: palette.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fireCount: {
        color: palette.white,
    },
    recipesText: {
        fontFamily: families.geist500,
        fontSize: 24,
        lineHeight: 28,
        color: palette.white,
        marginTop: 40,
    },
    camera: {
        flex: 1,
    },
});