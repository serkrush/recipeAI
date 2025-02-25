import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import ContainerContext from 'src/ContainerContext';
import { useActions } from 'src/hooks/useEntity';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import Flash from '../../../assets/svg/Flash';
import FlashSlash from '../../../assets/svg/FlashSlash';
import FlashAuto from '../../../assets/svg/FlashAuto';
import Rotate from '../../../assets/svg/Rotate';
import { useNavigation } from '@react-navigation/native';
import palette from 'src/theme/colors/palette';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from 'src/constants';
import { BlurView } from '@react-native-community/blur';

export default function Add() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const [frontCamera, setFrontCamera] = useState(false);
    const device = useCameraDevice(frontCamera ? 'front' : 'back');
    const cameraRef = useRef<Camera>(null);
    const [photoPath, setPhotoPath] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
    const { getRecipeAI } = useActions('Recipes');
    const { t } = useTranslation();
    const recipes = useSelector((state: AppState) => state.recipes);

    useEffect(() => {
        console.log('recipes', recipes);
        if (photoPath !== null) {
            setPhotoPath(null);
            navigator.navigate('RecipesList', { photoPath });
        }
    }, [recipes]);

    useEffect(() => {
        if (device) {
            setIsReady(true);
        }
    }, [device]);


    const takePicture = async () => {
        if (!isReady || !cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePhoto({
                flash: flash,
            });

            const photoPath = photo.path;
            setPhotoPath(photoPath);

            getRecipeAI({ path: photoPath });

            // navigator.navigate('RecipesList', { photoPath });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleFlash = () => {
        if (flash === 'off') {
            setFlash('on');
        } else if (flash === 'on') {
            setFlash('auto');
        } else {
            setFlash('off');
        }
    };

    const toggleCamera = () => {
        setFrontCamera((prev) => !prev);
    };

    if (!device) return <Text>{t('camera-not-found')}</Text>;
    const navigation = useNavigation();

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            {photoPath ? (
                <View>
                <Image source={{ uri: `file://${photoPath}` }} style={styles.preview} />
                <BlurView style={{...styles.blur}} blurType="light" blurAmount={10} />
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
         
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', paddingBottom: 20, paddingHorizontal: 20 }}>
                        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                            <Text style={styles.buttonText}>
                                {flash === 'off' ? <FlashSlash /> : flash === 'on' ? <Flash /> : <FlashAuto />}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 1 }}>
                        {/* {photoPath ? (
                    
                ) : ( */}
                        <Camera
                            ref={cameraRef}
                            style={styles.camera}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                        {/* )} */}
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingTop: 20,
                        paddingHorizontal: 20
                    }}>
                        <TouchableOpacity style={styles.switchCameraButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>{t('cencel')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <View style={{ width: 60, height: 60, borderRadius: 100, borderWidth: 1, borderColor: palette.black }}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.switchCameraButton} onPress={toggleCamera}>
                            <Text style={styles.buttonText}><Rotate /></Text>
                        </TouchableOpacity>
                    </View>


                </View>)}
        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 20, alignItems: 'center' },
    camera: { width: '100%', height: '100%' },
    preview: { width: '100%', height: '100%', resizeMode: 'contain' },
    button: {
        backgroundColor: palette.white,
        padding: 5,
        borderRadius: 100,
    },
    flashButton: {
        padding: 5,
    },
    switchCameraButton: {
        padding: 5,
    },
    buttonText: { color: 'white', fontSize: 16 },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});