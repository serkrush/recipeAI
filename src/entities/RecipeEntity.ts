import { schema } from 'normalizr';
import { call, put } from 'redux-saga/effects';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import { AlertModalType, ENTITY, Flag } from '../constants';
import reducer from '../decorators/reducer';
import * as actionTypes from '../store/actions';
import { BaseEntity, HTTP_METHOD } from './BaseEntity';
import { IUserEntity } from './EntityTypes';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { Image } from 'react-native';
import { images } from 'src/theme/images';
import uuid from 'react-native-uuid';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { supabase } from '../../supabaseClient';
@alias('Recipes')
@reducer(ENTITY.RECIPE)
export default class RecipeEntity extends BaseEntity<RecipeEntity> {
  constructor(opts: any) {
    super(opts);
    this.initSchema(
      ENTITY.RECIPE,
      {},
      {},
    );
  }

  public async encodeImageToBase64(imagePath: string) {
    try {
      let base64 = null;
      if (Platform.OS === 'android') {
        base64 = await RNFS.readFile(imagePath, 'base64');
      } else if (Platform.OS === 'ios') {
        base64 = await RNFS.readFile(imagePath, 'base64');
      }

      return base64;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  public async fetchImageBlob(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      return null;
    }
  };

  public async saveImageLocally(imageUrl, imageName) {
    try {
      console.log('imageUrl', imageUrl)
      const fileName = imageName + '.jpg';
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      console.log('path', path)
      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: path,
      }).promise;

      console.log('save path: ', downloadResult);
      let savedUri = null
      if (downloadResult.statusCode === 200) {
        if (Platform.OS === 'android') {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
            console.error('No save');
            return;
          }
        }

        console.log('saveImageLocally 1');
        savedUri = await CameraRoll.save(path, { type: 'photo' });
        console.log('save gallery:', savedUri);
      }
      console.log('saveImageLocally 2');
      const fileExists = await RNFS.exists(path);
      console.log('File yes: ', fileExists);
      return savedUri
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  public async fetchRecipeAI(messages: any[], openaiToken: string, type: string = 'new') {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiToken}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          response_format: {
            type: "json_schema",
            json_schema: {
              "name": "RecipeResponse",
              "schema": {
                "type": "object",
                "properties": {
                  "recipes": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": { "type": "string" },
                        "type": { "type": "string", "const": type },
                        "image": { "type": "string" },
                        "time": {
                          "type": "object",
                          "properties": {
                            "prep-time": { "type": "number" },
                            "cook-time": { "type": "number" },
                            "total-time": { "type": "number" }
                          },
                          "required": ["prep-time", "cook-time", "total-time"]
                        },
                        "ingredients": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": { "type": "string" },
                              "count": { "type": "string" }
                            },
                            "required": ["name", "count"]
                          }
                        },
                        "steps": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": ["name", "image", "time", "ingredients", "steps"]
                    }
                  }
                },
                additionalProperties: false,
                "required": ["recipes"]
              },
            }
          },
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      return null;
    }
  }
  public async fetchCreateImage(recipe: any, openaiToken: string) {
    try {

      let promt = `Generate an image of the dish - ${recipe.name}.`;
      if (recipe.ingredients?.length > 0) {
        promt = `${promt} The dish includes the following ingredients: `
        recipe.ingredients.map(ingredient => promt = `${promt} ${ingredient.name} - ${ingredient.count},`)

        promt = `${promt}. `
      }
      if (recipe.steps?.length > 0) {
        promt = `${promt} It is prepared using the following steps: `
        recipe.steps.map(step => promt = `${promt} ${step},`)
        promt = `${promt}. `

      }
      promt = `${promt} The image should showcase the dish in an appetizing and visually appealing way. `

      console.log('promt', promt)

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiToken}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          "prompt": promt,
          "n": 1,
          "size": "1024x1024",
        })
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // const resData = yield call(
      //   // xSave
      //   this.xOpenAi,
      //   'https://api.openai.com/v1/images/generations',
      //   {
      //     "model": "dall-e-3",
      //     "prompt": promt,
      //     "n": 1,
      //     "size": "1024x1024"
      //   },
      //   HTTP_METHOD.POST,
      // );
      // resData image !!!!!!!!! {"response": {"created": 1740661729, "data": [[Object]]}, "success": true}
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(' error', error);
    }
  }

  @action()
  public *getRecipeAI({ path }) {
    const { config, redux } = this.di;

    try {
      // console.log(1111)
      // redux.dispatch({type: actionTypes.CLEAR_RECIPE, payload: {/*id: recipe*/}});
      // // console.log(2222)
      // return
      // const img = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-KB8KdVIQcShP0fxExg890bQ5/user-bWeck1wMIqsn7yA8yidmxpUR/img-scTvj2iHZ7qM9xsUqJJ5Nb6Z.png?st=2025-02-27T17%3A21%3A19Z&se=2025-02-27T19%3A21%3A19Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-02-27T18%3A21%3A19Z&ske=2025-02-28T18%3A21%3A19Z&sks=b&skv=2024-08-04&sig=PYTZtlA0Pz2rLfQ7UXHJ6gFRc2xUr1lJPebf2R9V0XM%3D'
      // yield call(this.saveImageLocally, img);

      const imageBase64 = yield call(this.encodeImageToBase64, path);
      if (!imageBase64) {
        console.error('imageBase64 is empty');
        return;
      }
      // console.log('getRecipeAI 1')
      // console.log('getRecipeAI config 1', config)

      const resData = yield call(this.fetchRecipeAI, [
        {
          "role": "system",
          "content": "You are an AI chef that analyzes food images and generates recipes based on detected ingredients."
        },
        {
          "role": "user",
          content: [
            { type: 'text', text: `Analyze this food image and generate up to 3 recipes based on detected ingredients. Each recipe should take no more than 30 minutes to prepare.` },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ], config.openaiToken);
      const data = JSON.parse(resData?.choices[0].message?.content)
      // console.log('data', data)
      if (data.recipes?.length > 0) {
        for (let recipe of data.recipes) {
          try {
            const resDataImage = yield call(this.fetchCreateImage, recipe, config.openaiToken);
            console.log('resDataImage?.data[0].', resDataImage?.data[0])
            recipe.image = resDataImage?.data[0].url;
            const imageLocal = yield call(this.saveImageLocally, resDataImage?.data[0].url, recipe.name);
            recipe.imageLocal = imageLocal
            const id = uuid.v4();
            recipe.id = id;
            console.log('resDataImagxe ---- > ', resDataImage)
            console.log('id ---- > ', id)
            console.log('recipe ---- > ', recipe)
            redux.dispatch({ type: actionTypes.ADD_RECIPE, payload: { [id]: recipe } });
          } catch (error) {
            console.error(`Error generating image for recipe ${recipe.name}:`, error);
          }
        }
      }
      // const resDataImage = yield call(this.fetchCreateImage, imageBase64, config.openaiToken);

    } catch (error) {
      console.log(' error', error);
    }
  }

  @action()
  public *getGenericRecipeAI({
    gender,
    lifestyle,
    goal,
    age,
    weight,
    weightUnit,
    cause,
    diet,
    accomplish,
    mealApps }) {
    const { config, redux, t } = this.di;
    try {

      const {redux} = this.di;
      const userId = redux.state.users.userId;
      console.log('getGenericRecipeAI 1')
      let message = "Generate 5 healthy recipes that take no longer than 30 minutes to prepare. The recipes should be tailored for a female, 33 years old, weighing 100 kg, who is looking to "
      if (gender) {
        message = message + ` ${t('whats-your-gender')} - ${t(gender)},`
      }
      if (lifestyle) {
        message = message + ` ${t('lifestyle')} - ${t(lifestyle)},`
      }
      if (lifestyle) {
        message = message + ` ${t('your-goal')} - ${t(goal)},`
      }
      if (age) {
        message = message + ` ${t('whats-your-age')} - ${age},`
      }
      if (weight) {
        message = message + ` ${t('whats-your-weight')} - ${weight}${weightUnit},`
      }
      if (cause) {
        message = message + ` ${t('whats-stopping-you')} - ${t(cause)},`
      }
      if (diet) {
        message = message + ` ${t('specific-diet')} - ${t(diet)},`
      }
      if (accomplish) {
        message = message + ` ${t('what-youd-want-to-accomplish')} - ${t(accomplish)},`
      }
      console.log('getGenericRecipeAI 2')
      const resData = yield call(this.fetchRecipeAI, [
        {
          "role": "system",
          "content": "You are an AI chef that analyzes food images and generates recipes based on detected ingredients."
        },
        {
          "role": "user",
          content: [
            { type: 'text', text: message },
          ]
        }
      ], config.openaiToken, 'generic');
      console.log('getGenericRecipeAI 3')
      const data = JSON.parse(resData?.choices[0].message?.content)

      if (data.recipes?.length > 0) {
        for (let recipe of data.recipes) {
          try {



            const resDataImage = yield call(this.fetchCreateImage, recipe, config.openaiToken);
            console.log('resDataImage?.data[0].', resDataImage?.data[0])
            recipe.image = resDataImage?.data[0].url;



            


            console.log('recipe.image', resDataImage?.data[0].url)
            // const imageBlob = yield call(this.fetchImageBlob, resDataImage?.data[0].url);
              

            // // const arrayBuffer = await imageBlob.arrayBuffer();


            // const { data, error } = yield supabase.storage.from('recipes')
            // .upload(`recipes/${Date.now()}.png`, imageBlob, {
            //   contentType: 'image/png', // Укажи нужный MIME-тип
            // });

            // console.log('data image', data)
            // console.log('error image', error)
            // await supabase.storage
            // .from('images') // Название хранилища в Supabase
            // .upload(filePath, imageBlob, {
            //   contentType: 'image/png', // Укажи нужный MIME-тип
            // });







            const imageLocal = yield call(this.saveImageLocally, resDataImage?.data[0].url, recipe.name);
            recipe.imageLocal = imageLocal
            // const recipe_id = uuid.v4();

            console.log('Saving recipe to Supabase:', recipe.name);
            const id = uuid.v4();
            recipe.id = id;
            redux.dispatch({ type: actionTypes.ADD_RECIPE, payload: { [id]: recipe } });

            // 🟢 1. Сохранение рецепта в Supabase
            // const { data: recipeData, error: recipeError } = yield supabase
            //   .from('recipes')
            //   .insert([
            //     {
            //       name: recipe.name,
            //       type: recipe.type,
            //       image: recipe.image,
            //       prep_time: recipe.time['prep-time'],
            //       cook_time: recipe.time['cook-time'],
            //       total_time: recipe.time['total-time'],
            //       user_id: userId
            //     }
            //   ])
            //   .select('id')
            //   .single();

            // if (recipeError) throw new Error(`Ошибка при сохранении рецепта: ${recipeError.message}`);
            // console.log('recipeData.id', recipeData)
            // const recipeId = recipeData.id;

            // // 🟢 2. Сохранение ингредиентов
            // const ingredientsToInsert = recipe.ingredients.map(ingredient => ({
            //   name: ingredient.name,
            //   count: ingredient.count,
            //   recipe_id: recipeId // Используем один и тот же ID рецепта
            // }));
            
            
            // for (let ingredient of recipe.ingredients) {
            //   const { error: ingredientError } = yield supabase
            //     .from('ingredients')
            //     .insert([
            //       {
            //         recipe_id: recipeId,
            //         name: ingredient.name,
            //         count: ingredient.count,
            //         user_id: userId
            //       }
            //     ]);

            //   if (ingredientError) throw new Error(`Ошибка при сохранении ингредиента: ${ingredientError.message}`);
            // }

            // // 🟢 3. Сохранение шагов приготовления
            // for (let i = 0; i < recipe.steps.length; i++) {
            //   const { error: stepError } = yield supabase
            //     .from('steps')
            //     .insert([
            //       {
            //         recipe_id: recipeId,
            //         step_number: i + 1,
            //         description: recipe.steps[i],
            //         user_id: userId
            //       }
            //     ]);

            //   if (stepError) throw new Error(`Ошибка при сохранении шага: ${stepError.message}`);
            // }

            console.log('Recipe successfully saved to Supabase:', recipe.name);
          } catch (error) {
            console.error(`Error generating image for recipe ${recipe.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.log(' error', error);
    }
  }

//   @action()
// public *getGenericRecipeAI({
//   gender,
//   lifestyle,
//   goal,
//   age,
//   weight,
//   weightUnit,
//   cause,
//   diet,
//   accomplish,
//   mealApps
// }) {
//   const { config, redux, t } = this.di;
//   try {
//     const userId = redux.state.users.userId;
//     console.log('getGenericRecipeAI 1');

//     let message = "Generate 5 healthy recipe that takes no longer than 30 minutes to prepare. The recipe should be tailored for a female, 33 years old, weighing 100 kg, who is looking to";

//     if (gender) message += ` ${t('whats-your-gender')} - ${t(gender)},`;
//     if (lifestyle) message += ` ${t('lifestyle')} - ${t(lifestyle)},`;
//     if (goal) message += ` ${t('your-goal')} - ${t(goal)},`;
//     if (age) message += ` ${t('whats-your-age')} - ${age},`;
//     if (weight) message += ` ${t('whats-your-weight')} - ${weight}${weightUnit},`;
//     if (cause) message += ` ${t('whats-stopping-you')} - ${t(cause)},`;
//     if (diet) message += ` ${t('specific-diet')} - ${t(diet)},`;
//     if (accomplish) message += ` ${t('what-youd-want-to-accomplish')} - ${t(accomplish)},`;

//     console.log('getGenericRecipeAI 2');

//     const resData = yield call(this.fetchRecipeAI, [
//       { role: "system", content: "You are an AI chef that analyzes food images and generates recipes based on detected ingredients." },
//       { role: "user", content: [{ type: 'text', text: message }] }
//     ], config.openaiToken, 'generic');

//     console.log('getGenericRecipeAI 3');

//     const data = JSON.parse(resData?.choices?.[0]?.message?.content || '{}');

//     if (data.recipes?.length > 0) {
//       for (let recipe of data.recipes) {
//         try {
//           const resDataImage = yield call(this.fetchCreateImage, recipe, config.openaiToken);
//           const imageUrl = resDataImage?.data?.[0]?.url;

//           if (!imageUrl) throw new Error('Image generation failed');

//           console.log('Generated image URL:', imageUrl);

//           // Получаем BLOB-объект изображения
//           const imageBlob = yield call(this.fetchImageBlob, imageUrl);

//           if (!imageBlob || !imageBlob._data) throw new Error('Failed to fetch image blob');

//           console.log('Fetched image blob:', imageBlob);

//           // Загружаем изображение в Supabase
//           const { data: uploadData, error: uploadError } = yield supabase.storage
//             .from('recipes')
//             .upload(`recipes/${Date.now()}.png`, {
//               uri: imageBlob._data.blobId, // Используем `blobId`
//               type: 'image/png',
//               name: `recipe-${Date.now()}.png`,
//             });

//           if (uploadError) throw new Error(`Ошибка при загрузке изображения: ${uploadError.message}`);

//           console.log('Image uploaded successfully:', uploadData);

//           // Локальное сохранение изображения (если требуется)
//           const imageLocal = yield call(this.saveImageLocally, imageUrl, recipe.name);
//           recipe.imageLocal = imageLocal;

//           // 🟢 Сохранение рецепта в Supabase
//           const { data: recipeData, error: recipeError } = yield supabase
//             .from('recipes')
//             .insert([
//               {
//                 name: recipe.name,
//                 type: recipe.type,
//                 image: uploadData?.path, // Используем путь из Supabase
//                 prep_time: recipe.time?.['prep-time'],
//                 cook_time: recipe.time?.['cook-time'],
//                 total_time: recipe.time?.['total-time'],
//                 user_id: userId
//               }
//             ])
//             .select('id')
//             .single();

//           if (recipeError) throw new Error(`Ошибка при сохранении рецепта: ${recipeError.message}`);

//           console.log('Recipe saved:', recipeData);
//           const recipeId = recipeData.id;

//           // 🟢 Сохранение ингредиентов
//           for (let ingredient of recipe.ingredients || []) {
//             const { error: ingredientError } = yield supabase
//               .from('ingredients')
//               .insert([{ recipe_id: recipeId, name: ingredient.name, count: ingredient.count, user_id: userId }]);

//             if (ingredientError) throw new Error(`Ошибка при сохранении ингредиента: ${ingredientError.message}`);
//           }

//           // 🟢 Сохранение шагов приготовления
//           for (let i = 0; i < (recipe.steps || []).length; i++) {
//             const { error: stepError } = yield supabase
//               .from('steps')
//               .insert([{ recipe_id: recipeId, step_number: i + 1, description: recipe.steps[i], user_id: userId }]);

//             if (stepError) throw new Error(`Ошибка при сохранении шага: ${stepError.message}`);
//           }

//           console.log('Recipe successfully saved:', recipe.name);
//         } catch (error) {
//           console.error(`Ошибка при обработке рецепта ${recipe.name}:`, error);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Ошибка в getGenericRecipeAI:', error);
//   }
// }

  @action()
  public *createImage(recipe) {
    console.log('createImage start')
    try {
      let promt = `Generate an image of the dish - ${recipe.name}.`;
      if (recipe.ingredients?.length > 0) {
        promt = `${promt} The dish includes the following ingredients: `
        recipe.ingredients.map(ingredient => promt = `${promt} ${ingredient.name} - ${ingredient.count},`)

        promt = `${promt}. `
      }
      if (recipe.steps?.length > 0) {
        promt = `${promt} It is prepared using the following steps: `
        recipe.steps.map(step => promt = `${promt} ${step},`)
        promt = `${promt}. `

      }
      promt = `${promt} The image should showcase the dish in an appetizing and visually appealing way. `

      console.log('promt', promt)

      const resData = yield call(
        // xSave
        this.xOpenAi,
        'https://api.openai.com/v1/images/generations',
        {
          "model": "dall-e-3",
          "prompt": promt,
          "n": 1,
          "size": "1024x1024"
        },
        HTTP_METHOD.POST,
      );
      // resData image !!!!!!!!! {"response": {"created": 1740661729, "data": [[Object]]}, "success": true}
      console.log('resData image !!!!!!!!! 1', resData.response.data)
      console.log('resData image !!!!!!!!! 2', resData.response)
      console.log('resData image !!!!!!!!! 3', resData.response.data)
    } catch (error) {
      console.log(' error', error);
    }
  }

}
