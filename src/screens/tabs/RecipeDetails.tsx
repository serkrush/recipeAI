import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Check from '../../../assets/svg/Check';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ButtonForm from 'src/components/Form/ButtonForm';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import { AppState } from 'src/constants';
import { useActions } from 'src/hooks/useEntity';
import { TRANSFER_RECIPE } from 'src/store/actions';
import { colors, families } from 'src/theme';
import palette from 'src/theme/colors/palette';
import { images } from 'src/theme/images';
import { getFilePathFromPHAsset } from 'src/utils/getFilePathFromPHAsset';
import { windowWidth } from 'src/utils/size';
import { TimeTable } from 'src/components/Recipe/TimeTeble';
import { useTranslation } from 'react-i18next';
import { Ingredient } from 'src/components/Recipe/Ingredient';
import { Instruction } from 'src/components/Recipe/Instruction';

export default function RecipeDetails({ route }) {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { recipe } = route.params;
    console.log('recipe', recipe)
    const [fileUri, setFileUri] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (recipe?.imageLocal) {
            getFilePathFromPHAsset(recipe.imageLocal).then((uri) => {
                setFileUri(uri);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [recipe?.imageLocal]);
    console.log('fileUri', fileUri)

    return (
        <View style={{ height: '100%', backgroundColor: palette.black }}>
            <View style={{ position: 'absolute', top: StatusBar.currentHeight || insets.top || 0, zIndex: 111, width: '100%', left: 24 }}>
                <HeaderProgressBar />
            </View>
            <ScrollView>
                <Image
                    source={{ uri: recipe.imageLocal }}
                    style={{
                        zIndex: 111,
                        width: windowWidth + 24,
                        height: 400,
                        left: -24,
                        top: 0,
                    }}
                />

                <BaseScreenLayout
                    containerStyle={{
                        paddingHorizontal: 24,
                        paddingVertical: 20,
                        // zIndex: 111
                    }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: families.geist, fontSize: 34, lineHeight: 44, color: palette.white }}>{recipe?.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
                            <TimeTable time={`${recipe.time['prep-time']} ${t('mins')}`} description={t('prep-time')} />
                            <TimeTable time={`${recipe.time['cook-time']} ${t('mins')}`} description={t('cook-time')} />
                            <TimeTable time={`${recipe.time['total-time']} ${t('mins')}`} description={t('total-time')} />
                        </View>
                        <View style={{
                            height: 6,
                            backgroundColor: palette.white008,
                            marginLeft: -24,
                            width: windowWidth + 24,
                            marginVertical: 32
                        }} />
                        <Text style={{
                            fontFamily: families.geist500,
                            fontWeight: '500', fontSize: 24, lineHeight: 28, color: palette.white,
                        }}>{t('ingredients')}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <Text style={{ fontFamily: families.geist, fontSize: 16, lineHeight: 24, color: palette.hotPink }}>{t('you-have-num', { num: recipe?.ingredients?.length })}</Text><Text style={{ fontFamily: families.geist, fontSize: 16, lineHeight: 24, color: palette.white }}> {t('of-num-gradients', { num: recipe?.ingredients?.length })}</Text>
                        </View>
                        <View style={{ marginTop: 24, gap: 16 }}>
                            {
                                recipe?.ingredients?.length > 0 && recipe?.ingredients?.map((ingredient, index) => {
                                    console.log('ingredient', ingredient)
                                    return (
                                        <Ingredient count={ingredient.count} description={ingredient.name} isCheck={true} />
                                    )
                                })
                            }
                        </View>

                        <View style={{
                            height: 6,
                            backgroundColor: palette.white008,
                            marginLeft: -24,
                            width: windowWidth + 24,
                            marginVertical: 32
                        }} />

                        <Text style={{
                            fontFamily: families.geist500,
                            fontWeight: '500', fontSize: 24, lineHeight: 28, color: palette.white
                        }}>{t('instructions')}</Text>

                        <View style={{ gap: 40, marginTop: 24 }}>
                            {
                                recipe?.steps?.length > 0 && recipe?.steps?.map((step, index) => {
                                    return (
                                        <Instruction num={index + 1} description={step} />
                                    )
                                })
                            }
                        </View>
                    </View>
                </BaseScreenLayout>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: palette.black, paddingTop: 40, paddingBottom: 30 }}>
                <ButtonForm
                    text={t('start-cooking')}
                    actionButton={() => { }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});