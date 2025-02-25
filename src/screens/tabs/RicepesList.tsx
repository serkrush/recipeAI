import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ButtonForm from 'src/components/Form/ButtonForm';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import HeaderProgressBar from 'src/components/layouts/HeaderProgressBar';
import { AppState } from 'src/constants';
import { useActions } from 'src/hooks/useEntity';
import { colors, families } from 'src/theme';
import palette from 'src/theme/colors/palette';
import { images } from 'src/theme/images';

export default function RecipesList({ route }) {
    // const { photoBase64 } = route.params;
    console.log('RecipesList')
    const { getRecipeAI } = useActions('Recipes');
    const recipes = useSelector((state: AppState) => {
        console.log('state !!!!!!!!!--', state)
        return state.recipes;
    });
    console.log('recipes !!!!!!!!!--', recipes)

    // const recipesValues = Object.values(recipes);
    const recipesValues = [
        {
            "id": "1171be7e-af4a-468f-9568-d9c66e9aba7c",
            "name": "Fresh Fruit Salad",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "Chop apple and orange into bite-sized pieces.",
                "Combine all chopped fruits in a large bowl.",
                "Drizzle honey over the fruit.",
                "Toss gently to combine and serve chilled."
            ],
            "time": {
                "cook-time": 0,
                "prep-time": 15,
                "total-time": 15
            }
        },
        {
            "id": "2a4be068-6950-4cba-b969-e6f224527b30",
            "name": "Quick Egg and Spinach Scramble",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "Heat olive oil in a pan over medium heat.",
                "Crack eggs into a bowl and whisk with salt and pepper.",
                "Add spinach to the pan and sauté until wilted.",
                "Pour eggs over spinach and cook, stirring gently until eggs are set.",
                "Top with cheese if desired and serve hot."
            ],
            "time": {
                "cook-time": 10,
                "prep-time": 5,
                "total-time": 15
            }
        },
        {
            "id": "4af60fdf-19e7-4d41-8e05-4695d20d458e",
            "name": "Vegetable Omelette",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "In a bowl, whisk eggs with salt and pepper.",
                "In a non-stick skillet, melt butter over medium heat.",
                "Pour in the whipped eggs and cook until the edges start to set.",
                "Add mixed vegetables on one half of the omelette.",
                "Fold the omelette and cook until fully set. Serve warm."
            ],
            "time": {
                "cook-time": 10,
                "prep-time": 5,
                "total-time": 15
            }
        },
        {
            "id": "7441de88-335b-49bf-8cca-9fc71a946117",
            "name": "Classic Vegetable Soup",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "In a large pot, heat some olive oil over medium heat.",
                "Add chopped onion and sauté until translucent.",
                "Pour in vegetable broth and bring to a boil.",
                "Add mixed vegetables, salt, pepper, and thyme.",
                "Reduce heat and simmer for 20 minutes. Serve hot."
            ],
            "time": {
                "cook-time": 25,
                "prep-time": 15,
                "total-time": 40
            }
        },
        {
            "id": "b5a82d26-ecd8-4cfb-8673-1712ca5d8796",
            "name": "Colorful Vegetable Stir-Fry",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "Chop the bell peppers, carrots, and broccoli into bite-sized pieces.",
                "Heat olive oil in a pan over medium heat.",
                "Add minced garlic and sauté for 1 minute.",
                "Add the chopped vegetables and stir-fry for about 5 minutes.",
                "Pour in soy sauce and continue to cook for another 5-10 minutes until vegetables are tender.",
                "Serve hot."
            ],
            "time": {
                "cook-time": 15,
                "prep-time": 10,
                "total-time": 25
            }
        },
        {
            "id": "cb6826d9-c088-4d1a-be44-7d60beebd1f9",
            "name": "Vegetable Stir-Fry",
            "image": "",
            "ingredients": ['[Object]', '[Object]', '[Object]', '[Object]'],
            "steps": [
                "Heat olive oil in a pan over medium heat.",
                "Add minced garlic and sauté for 1 minute until fragrant.",
                "Add mixed vegetables and stir-fry for 5-7 minutes until tender.",
                "Pour in soy sauce and mix well. Cook for another 2 minutes.",
                "Serve warm."
            ],
            "time": {
                "cook-time": 10,
                "prep-time": 10,
                "total-time": 20
            }
        }
    ]

    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 24,
                paddingVertical: 20,
            }}>
            <View style={{ flex: 1 }}>
                <View>
                    <HeaderProgressBar
                        title={recipesValues?.length + ' recipes found for you!'}
                        description='That take less than 25 minutes to make.'
                        textHeaderStyle={{ width: '100%', textAlign: 'center' }}
                        textHeaderDescriptionStyle={{ width: '100%', textAlign: 'center', }}
                    />
                </View>
                <ScrollView style={{ marginTop: 40 }}>
                    {
                        recipesValues?.length > 0 && recipesValues.map((recipe, index) => {
                            console.log('recipe', recipe)
                            return (
                                <View key={index} style={{ flexDirection: 'row', gap: 24, width: '100%', justifyContent: 'space-between', marginBottom: 40 }}>
                                    <View style={{ position: 'relative' }}>
                                        <View style={{
                                            position: 'absolute',
                                            zIndex: 10,
                                            bottom: -5,
                                            left: '50%',
                                            transform: [{ translateX: -29 }], // Половина ширины блока с числом 
                                            backgroundColor: palette.black,
                                            paddingHorizontal: 6,
                                            paddingVertical: 2,
                                            width: 58,
                                            borderRadius: 4
                                        }}>
                                            <Text style={{ color: palette.hotPink, fontSize: 14, fontFamily: families.geist500, lineHeight: 20 }}>{recipe.time["total-time"]} min</Text>
                                        </View>
                                        <Image source={images.example2} style={{ width: 112, height: 112, borderRadius: 20 }} />
                                        {/* <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100 }} /> */}
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                                        <Text style={{
                                            color: palette.white,
                                            fontFamily: families.geist500,
                                            fontSize: 18,
                                            lineHeight: 28
                                        }}>{recipe.name}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ backgroundColor: palette.hotPink, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 100 }}>
                                                <Text>Cook</Text>
                                            </View>
                                            <Text style={{
                                                color: palette.hotPink,
                                                fontFamily: families.geist500,
                                                fontSize: 14,
                                                lineHeight: 24
                                            }}>
                                                {recipe.ingredients?.length} of {recipe.ingredients?.length} gradients
                                            </Text>
                                        </View>
                                    </View>
                                </View>
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
                        actionButton={() => console.log('Show more')}
                    />
                </View>
            </View>
        </BaseScreenLayout>
    );
}

const styles = StyleSheet.create({

});