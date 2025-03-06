import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
import { colors, families } from 'src/theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TRANSFER_RECIPE } from 'src/store/actions';
import Border from '../../../assets/svg/Border';
import RNFS from 'react-native-fs';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { getFilePathFromPHAsset } from 'src/utils/getFilePathFromPHAsset';
import { RecipeItem } from 'src/components/Recipe/RecipeItem';
import { supabase } from '../../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main() {
    const [showSelect, setShowSelect] = useState(false);
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const { t } = useTranslation();
    const { getRecipeAI, getGenericRecipeAI } = useActions('Recipes');
    const { signUpUser, loginUser, getUserSaga } = useActions('Users');

    const formRegister = useSelector((state: AppState) => state.formRegister);
    const users = useSelector((state: AppState) => state.users);
    console.log('users!!!!!!!!!!!!!!!!', users);

    const recipes = useSelector((state: AppState) => {
        console.log('state', state)
        return state.recipes;
    });
    const recipesValues = Object.values(recipes);
    const recipesGeneric = recipesValues.filter(recipe => recipe.type === 'generic');
    const recipesDefault = recipesValues.filter(recipe => recipe.type === 'default');

    useEffect(() => {
        if (formRegister && recipesGeneric.length === 0) {
            console.log('FETCH!!!!!!!!!!!!!!!!');
            getGenericRecipeAI(formRegister);
        }
    }, [recipesGeneric]);
    console.log('recipesValues 1 ------- > ', recipesValues)

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
            {console.log('recipesGeneric', recipesGeneric)}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                    {Array.from({ length: 5 }).map((_, index) => {
                        console.log('recipesGeneric[index].imageLocal', recipesGeneric[index]?.imageLocal)

                        // const fileUri = recipesGeneric[index] && getFilePathFromPHAsset(recipesGeneric[index]?.imageLocal);
                        // console.log('fileUri', fileUri)
                        return (
                            <RecipeItem
                                key={recipesGeneric[index]?.id ?? index}
                                recipe={recipesGeneric[index]}
                                onPress={() => {
                                    console.log('navigate recipe', recipesGeneric[index]);
                                    navigator.navigate('RecipeDetails', { recipe: recipesGeneric[index] });
                                }}
                            />

                        )
                    })}
                </ScrollView>
                <Text style={[styles.recipesText, { marginTop: 52 }]}>{t('your-food')}</Text>
                <View style={{ alignItems: 'center' }}>
                    <Border />
                    <Text style={{
                        fontFamily: families.geist500,
                        fontWeight: '500',
                        color: palette.white,
                        fontSize: 18,
                        lineHeight: 28,
                        textAlign: 'center',
                        marginTop: 12
                    }}>{t('you-havent-taken-a-scan-yet')}</Text>
                    <Text style={{
                        fontFamily: families.geist,
                        color: palette.white048,
                        fontSize: 14,
                        lineHeight: 20,
                        textAlign: 'center',
                        paddingHorizontal: 30
                    }}>{t('start-creating')}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {/* <ButtonForm
                    text={'логин user'}
                    actionButton={() => {
                        // getRecipeAI()
                        loginUser({ email: 'opel2912@gmail.com', password: 'qwerty123' })
                    }}
                /> */}
                {/* <ButtonForm
                    text={'логин user'}
                    actionButton={async() => {
                        navigator.navigate('RecipesList', { photoPath : ''});
                    }}
                /> */}
                {/* <ButtonForm
                text={'new user'}
                actionButton={() => {
                    // getRecipeAI()
                    signUpUser({email:'opel2912@gmail.com', password:'qwerty123', age: 33, weight: 100})
                }}
                /> */}
                {/* <ButtonForm
                    text={'check session'}
                    actionButton={() => {
                        // getRecipeAI()
                        const session = supabase.auth.getSession();
                        console.log('Session:', session);
                    }}
                /> */}
                {/* <ButtonForm
                    text={'check session'}
                    actionButton={async() => {
                        const keys = await AsyncStorage.getAllKeys();
                        const value = await AsyncStorage.getItem('sb-gmqxfqgybgmtevnvmrvc-auth-token');
                        console.log('check', keys)
                        console.log('value', value)
                        return
                        getUserSaga()
                        // const session = supabase.auth.getSession();
                        // console.log('Session:', session);
                    }}
                /> */}
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
                <ButtonForm
                    text={'test add'}
                    actionButton={() => {
                        // getRecipeAI()
                        getGenericRecipeAI(formRegister);
                    }}
                />
            </View> */}
        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        // gap: 16,
        // rowGap: 16,
        // columnGap: 16,
        // backgroundColor:'red'
    },
    item: {
        width: 164,
        // height: 174,
        borderRadius: 20,
        marginRight: 16,
    },
    text: {
        fontFamily: families.geist500,
        fontWeight: '500',
        color: palette.white,
        fontSize: 16,
        lineHeight: 26,
        marginTop: 8
    },
    subtext: {
        fontFamily: families.geist,
        color: palette.white048,
        fontSize: 14,
        lineHeight: 20
    },
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
        fontWeight: '500',
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
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 28,
        color: palette.white,
        marginTop: 40,
    },
    camera: {
        flex: 1,
    },
});