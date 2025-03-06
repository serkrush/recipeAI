// // import { schema } from 'normalizr';
// // import { call, put } from 'redux-saga/effects';
// // import alias from 'src/decorators/alias';
// // import action from '../../src/decorators/action';
// // import { AlertModalType, ENTITY, Flag } from '../constants';
// // import reducer from '../decorators/reducer';
// // import * as actionTypes from '../store/actions';
// // import { BaseEntity, HTTP_METHOD } from './BaseEntity';
// // import { IUserEntity } from './EntityTypes';
// // import { createClient } from '@supabase/supabase-js';
// // import { supabase } from '../../supabaseClient';

// // // Инициализация Supabase клиента
// // // const supabaseUrl = 'https://your-supabase-url.supabase.co';
// // // const supabaseKey = 'your-supabase-key';
// // // const supabase = createClient(supabaseUrl, supabaseKey);

// // @alias('Users')
// // @reducer(ENTITY.USER)
// // export default class UserEntity extends BaseEntity<UserEntity> {
// //     constructor(opts: any) {
// //         super(opts);
// //         this.initSchema(
// //             ENTITY.USER,
// //             {},
// //             { idAttribute: 'uid' },
// //         );
// //     }

// //     @action()
// //     public *signUpUser(user) {
// //         console.log('111')
// //         try {
// //             // Регистрация пользователя в Supabase Auth
// //             const res = yield call(
// //                 [supabase.auth, supabase.auth.signUp],
// //                 {
// //                     email: user.email,
// //                     password: user.password,
// //                 }
// //             );
// //             const authError = res.error;
// //             const authUser = res.data.user;
// //             console.log('authUser',authUser)
// //             console.log('authError',authError)
// //             console.log('authUser.id',authUser.id)

// //             if (authError) {
// //                 throw authError;
// //             }

// //             // Добавление информации о пользователе в таблицу users
// //             const respProfiles = yield call(
// //                 [supabase, supabase.from],
// //                 'profiles',
// //                 {
// //                     uid: authUser.id,
// //                     email: user.email,
// //                     age: user.age,
// //                     weight: user.weight,
// //                     // Добавьте другие поля, которые вам нужны
// //                 }
// //             );

// //             // if (error) {
// //             //     throw error;
// //             // }


// //             console.log('respProfiles', respProfiles)
// //             // Успешная регистрация
// //             // yield put({
// //             //     type: actionTypes.USER_SIGN_UP_SUCCESS,
// //             //     payload: data,
// //             // });

// //         } catch (error) {
// //             console.log('error', error)
// //             // Обработка ошибок
// //             // yield put({
// //             //     type: actionTypes.USER_SIGN_UP_FAILURE,
// //             //     payload: error.message,
// //             // });
// //         }
// //     }
// // }




// import { schema } from 'normalizr';
// import { call, put } from 'redux-saga/effects';
// import alias from 'src/decorators/alias';
// import action from '../../src/decorators/action';
// import { AlertModalType, ENTITY, Flag } from '../constants';
// import reducer from '../decorators/reducer';
// import * as actionTypes from '../store/actions';
// import { BaseEntity, HTTP_METHOD } from './BaseEntity';
// import { IUserEntity } from './EntityTypes';
// import { supabase } from '../../supabaseClient';
// // import { supabase } from 'src/supabaseClient'; // Убедись, что этот файл есть

// @alias('Users')
// @reducer(ENTITY.USER)
// export default class UserEntity extends BaseEntity<UserEntity> {
//     constructor(opts: any) {
//         super(opts);
//         this.initSchema(
//             ENTITY.USER,
//             {},
//             { idAttribute: 'uid' },
//         );
//     }

//     @action()
//     public *signUpUser(user) {
//         console.log('user')
//         try {
//             const { email, password, age, weight } = user;

//             // 1. Регистрируем пользователя через Supabase Auth
//             const { data, error } = yield call(
//                 [supabase.auth, supabase.auth.signUp],
//                 { email, password }
//             );

//             if (error) {
//                 throw new Error(error.message);
//             }

//             const userId = data?.user?.id;
//             if (!userId) {
//                 throw new Error('Ошибка: пользователь не был создан.');
//             }

//             // 2. Сохраняем дополнительные данные в таблице `profiles`
//             console.log('userId', userId)
//             console.log('data', data)
//             const { error: profileError } = yield call(
//                 [supabase.from('profiles'), supabase.from('profiles').insert],
//                 [{ id: userId, age, weight, email }]
//             );

//             if (profileError) {
//                 throw new Error(profileError.message);
//             }
//             console.error('!!!! регистрации:', { userId, email, age, weight });

//             // 3. Диспатчим успешную регистрацию
//             // yield put({ type: actionTypes.USER_SIGNUP_SUCCESS, payload: { userId, email, age, weight } });

//         } catch (err) {
//             console.error('Ошибка регистрации:', err);
//             // yield put({ type: actionTypes.USER_SIGNUP_FAILURE, error: err.message });
//         }
//     }
// }


import { schema } from 'normalizr';
import { call, put } from 'redux-saga/effects';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import { AlertModalType, ENTITY, Flag } from '../constants';
import reducer from '../decorators/reducer';
import * as actionTypes from '../store/actions';
import { BaseEntity, HTTP_METHOD } from './BaseEntity';
import { IUserEntity } from './EntityTypes';
import { supabase } from '../../supabaseClient';

@alias('Users')
@reducer(ENTITY.USER)
export default class UserEntity extends BaseEntity<UserEntity> {
    constructor(opts: any) {
        super(opts);
        this.initSchema(
            ENTITY.USER,
            {},
            { idAttribute: 'uid' },
        );
    }

    @action()
    public *signUpUser(user) {
        console.log('user');
        try {
            const { email, password, age, weight } = user;

            // 1. Регистрируем пользователя через Supabase Auth
            const { data, error } = yield call(
                [supabase.auth, supabase.auth.signUp],
                { email, password }
            );

            if (error) {
                throw new Error(error.message);
            }

            const userId = data?.user?.id;
            if (!userId) {
                throw new Error('Ошибка: пользователь не был создан.');
            }

            // 2. Сохраняем дополнительные данные в таблице `profiles`
            console.log('userId', userId);
            console.log('data', data);
            const { error: profileError } = yield call(
                [supabase.from('profiles'), supabase.from('profiles').insert],
                [{ id: userId, age, weight, email }]
            );

            if (profileError) {
                throw new Error(profileError.message);
            }
            console.error('!!!! регистрации:', { userId, email, age, weight });

            // 3. Диспатчим успешную регистрацию
            // yield put({ type: actionTypes.USER_SIGNUP_SUCCESS, payload: { userId, email, age, weight } });
        } catch (err) {
            console.error('Ошибка регистрации:', err);
            // yield put({ type: actionTypes.USER_SIGNUP_FAILURE, error: err.message });
        }
    }

    @action()
    public *loginUser(user) {
        console.log('loginUser');
        try {
            const { email, password } = user;

            // 1. Логиним пользователя через Supabase Auth
            const { data, error } = yield call(
                [supabase.auth, supabase.auth.signInWithPassword],
                { email, password }
            );

            if (error) {
                throw new Error(error.message);
            }

            const userId = data?.user?.id;
            if (!userId) {
                throw new Error('Ошибка: пользователь не найден.');
            }

            // 2. Загружаем дополнительные данные пользователя
            const { data: profile, error: profileError } = yield call(
                [supabase.from('profiles'), supabase.from('profiles').select],
                '*'
            );

            if (profileError) {
                throw new Error(profileError.message);
            }

            console.log('Успешный вход:', { userId, email, profile });
            yield put({ type: actionTypes.USER_LOGIN_SUCCESS, payload: { userId, email, profile } });
        } catch (err) {
            console.error('Ошибка входа:', err);
            // yield put({ type: actionTypes.USER_LOGIN_FAILURE, error: err.message });
        }
    }


    @action()
    public *getUserSaga() {
        try {
          const { data, error } = yield call([supabase.auth, supabase.auth.getSession]);
      
          if (error || !data?.session) {
            console.error('❌ Ошибка: нет активной сессии');
            return null;
          }
          
          console.log('активная сессия!!!!');
        //   console.log('data.session', data.session)
          console.log('data.session.user', data.session.user)
          return data.session.user;
        } catch (error) {
          console.error('Ошибка при получении пользователя:', error);
          return null;
        }
      }
}
