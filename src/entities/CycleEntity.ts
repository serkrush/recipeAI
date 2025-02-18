import {BaseEntity, HTTP_METHOD} from './BaseEntity';
import reducer from '../decorators/reducer';
import {ENTITY} from '../constants';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import {call} from 'redux-saga/effects';

@alias('Cycles')
@reducer(ENTITY.Cycle)
export default class CycleEntity extends BaseEntity<CycleEntity> {
    constructor(opts: any) {
        super(opts);
        this.initSchema(ENTITY.Cycle, {}, {});
    }

    @action()
    public *updateCycle({cycleId, data}) {
        const {t} = this.di;
        //return
        try {
            console.log('updateCycle');
            console.log('updateCycle data', data);
            const resData = yield call(
                this.xSave,
                `/cycles/${cycleId}/update`,
                {
                    data,
                },
            );
            console.log('updateCycle resData', resData);
            if (resData.success) {
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    @action()
    public *deleteCycle({cycleId}) {
        const resData = yield call(this.xDelete, `/cycles/${cycleId}/delete`);
        console.log('deleteCycle resData', resData);
        if (resData?.success) {
            const {navigator} = this.di;
            navigator.pop();
        }
    }

    @action()
    public *getCycleUpdates({ids}: {ids: string[]}) {
        const resData = yield call(
            this.xSave,
            '/cycles',
            {ids},
            HTTP_METHOD.POST,
            true,
            true,
        );
    }

}
