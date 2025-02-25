import { schema } from 'normalizr';
import { call, put } from 'redux-saga/effects';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import { AlertModalType, ENTITY, Flag } from '../constants';
import reducer from '../decorators/reducer';
import * as actionTypes from '../store/actions';
import { BaseEntity, HTTP_METHOD } from './BaseEntity';
import { IUserEntity } from './EntityTypes';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { Image } from 'react-native';
import { images } from 'src/theme/images';
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

  @action()
  public *getRecipeAI({ path }) {
    try {
      const imageBase64 = yield call(this.encodeImageToBase64, path);
      if (!imageBase64) {
        console.error('imageBase64 is empty');
        return;
      }

      const resData = yield call(
        this.xOpenAi,
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              "role": "user",
              content: [
                { type: 'text', text: `Analyze this food image and generate multiple recipes based on detected ingredients, including a link to a photo of the prepared dish.` },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
              ]
            }
          ],
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
          // max_tokens: 300,
        },
        HTTP_METHOD.POST,
      );
    } catch (error) {
      console.log(' error', error);
    }
  }

}
