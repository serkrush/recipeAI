import {schema} from 'normalizr';
import {call, put} from 'redux-saga/effects';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import {AlertModalType, ENTITY, Flag} from '../constants';
import reducer from '../decorators/reducer';
import * as actionTypes from '../store/actions';
import {BaseEntity, HTTP_METHOD} from './BaseEntity';
import {IUserEntity} from './EntityTypes';
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

    @action()
    public *getRecipeAI() {
        // console.log('getRecipeAI data', data);
        // const force = data?.force ?? false;
        console.log('getRecipeAI');
        try {
          const prompt = `Сгенерируй рецепт используя следующие ингредиенты: яблоко, картошка, помидор, банан, мясо куриное`;

            const resData = yield call(
                this.xRead,
                'https://api.openai.com/v1/completions',
                {
                    model: 'gpt-3.5-turbo', // Используйте актуальную модель
                    messages: [
                      {
                        role: 'user',
                        content: prompt,
                      },
                    ],
                    max_tokens: 150, // Максимальное количество токенов в ответе
                    temperature: 0.7, // Параметр для контроля креативности
                  },
                HTTP_METHOD.POST,
            );
            console.log('resData', resData)
        } catch (error) {
            console.log(' error', error);
        }
    }

}
