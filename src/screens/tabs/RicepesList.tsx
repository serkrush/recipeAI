import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonForm from 'src/components/Form/ButtonForm';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import { AppState } from 'src/constants';
import ContainerContext from 'src/ContainerContext';
import { useActions } from 'src/hooks/useEntity';
import { TRANSFER_RECIPE } from 'src/store/actions';
import { colors, families } from 'src/theme';
import palette from 'src/theme/colors/palette';
import { images } from 'src/theme/images';

export default function RecipesList({ route }) {
    const { getRecipeAI } = useActions('Recipes');
    const { photoPath } = route.params;
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    const recipes = useSelector((state: AppState) => {
        // console.log('state !!!!!!!!!---', state)
        return state.recipes;
    });
    console.log('recipes !!!!!!!!!--', recipes)

    const recipesValues = Object.values(recipes);
    const recipesNew = recipesValues.filter(recipe => recipe.type === 'new')
    // console.log('recipesValues  !!!!!!!!!--', recipesValues)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log('Leaving Main screen1 !!! !!! !!!');
            dispatch({ type: TRANSFER_RECIPE, payload: recipesNew });
            // Add your custom logic here
            console.log('Leaving Main screen2 !!! !!! !!!');

        });

        return unsubscribe;
    }, [navigation]);

     useFocusEffect(
            React.useCallback(() => {
                console.log('useFocusEffect 1');
    
            //   alert('Screen was focused');
              // Do something when the screen is focused
              return () => {
                // alert('Screen was unfocused');
                console.log('useFocusEffect 2');
                dispatch({ type: TRANSFER_RECIPE, payload: recipesNew });
    
                // Do something when the screen is unfocused
                // Useful for cleanup functions
              };
            }, [])
          );
    


    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 24,
                paddingVertical: 20,
            }}>
            <View style={{ flex: 1 }}>
                <View>
                    <HeaderProgressBar
                        title={recipesNew?.length + ' recipes found for you!'}
                        description='That take less than 25 minutes to make.'
                        textHeaderStyle={{ width: '100%', textAlign: 'center' }}
                        textHeaderDescriptionStyle={{ width: '100%', textAlign: 'center', }}
                    />
                </View>
                
                <ScrollView style={{ marginTop: 40 }}>
                    {
                        recipesNew?.length > 0 && recipesNew.map((recipe, index) => {
                            console.log('recipe.imageLocal', recipe.imageLocal)
                            return (
                                <TouchableOpacity
                                                        key={recipe.id} style={{ flexDirection: 'row', gap: 24, width: '100%', justifyContent: 'space-between', marginBottom: 40 }}
                                                        onPress={() => {
                                                            console.log('navigate recipe')
                                                            navigator.navigate('RecipeDetails', {recipe});
                                                        }}>
                                    <View style={{ position: 'relative' }}>
                                        <View style={{
                                            position: 'absolute',
                                            zIndex: 10,
                                            bottom: -5,
                                            left: '50%',
                                            transform: [{ translateX: -29 }],
                                            backgroundColor: palette.black,
                                            paddingHorizontal: 6,
                                            paddingVertical: 2,
                                            width: 58,
                                            borderRadius: 4
                                        }}>
                                            <Text style={{ color: palette.hotPink, fontSize: 14, fontFamily: families.geist500,
                    fontWeight: '500', lineHeight: 20 }}>{recipe.time["total-time"]} min</Text>
                                        </View>
                                        <Image source={{ uri: recipe.imageLocal }} style={{ width: 112, height: 112, borderRadius: 20 }} />
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                                        <Text style={{
                                            color: palette.white,
                                            fontFamily: families.geist500,
                                            fontWeight: '500',
                                            fontSize: 18,
                                            lineHeight: 28
                                        }}>
                                            {recipe.name}
                                        </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ backgroundColor: palette.hotPink, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 100 }}>
                                                <Text>Cook</Text>
                                            </View>
                                            <Text style={{
                                                color: palette.hotPink,
                                                fontFamily: families.geist500,
                                                fontWeight: '500',
                                                fontSize: 14,
                                                lineHeight: 24
                                            }}>
                                                {recipe.ingredients?.length} of {recipe.ingredients?.length} gradients
                                            </Text>
                                        </View>
                                </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <View
                    style={{
                        paddingVertical: 20,
                        width: '100%',
                    }}
                >
                    <ButtonForm
                        text={'Show more'}
                        style={{
                            with: '100%'
                        }}
                        actionButton={() => getRecipeAI({ path: photoPath })}
                    />
                </View>
            </View>
        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({

});