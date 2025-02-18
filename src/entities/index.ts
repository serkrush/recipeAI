import {asClass} from 'awilix';
import UserEntity from './UserEntity';
import Identity from './Identity';
import CycleEntity from './CycleEntity';

export interface IEntityContainer {
    Users: UserEntity;
    Identity: Identity;
    Cycles: CycleEntity;
}

export default {
    Users: asClass(UserEntity).singleton(),
    Identity: asClass(Identity).singleton(),
    Cycles: asClass(CycleEntity).singleton(),
};
