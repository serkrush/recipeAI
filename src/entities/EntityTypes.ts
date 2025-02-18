import {ROLE} from 'acl/types';
import {AuthType, TimeFormat} from 'src/constants';

export interface IUserEntity {
    uid: string;
    parentsId?: string[];
    fcmTokens?: {
        lastUpdateTime: number;
        token: string;
    }[];
    firstName: string;
    lastName: string;
    email: string;
    role?: ROLE;
    country?: string;
    timezone?: string;
    language?: string;
    scale?: string;
    currencySymbol?: string;
    timeFormat?: TimeFormat;
    createdAt?: number;
    updatedAt?: number;
    isInvitation?: boolean;
    authType?: AuthType;

    access?: string[];
    groups?: string[];

    notificationSettings?: number;
    emailSettings?: number;
}

export enum IngredientActionType {
    Ingredient = 'ingredient',
    Method = 'method',
}
export interface IIngredientEntity {
    action: IngredientActionType;
    description: string;
    index?: number;
    media_resource?: string;
}
export interface IStageEntity {
    fanPerformance1?: number;
    fanPerformance1Label?: string;
    fanPerformance2?: number;
    fanPerformance2Label?: string;
    duration?: number | null;
    initTemperature: number;
    weight?: number | null;
    heatingIntensity: number;
}

export interface IFormStageEntity extends IStageEntity {
    hours: number;
    minutes: number;
    viewInitTemperature: number;
}
export interface ISelectOptions {
    label: string;
    value: string;
}
export interface PresetParams {
    adjustment: number;
    marinated: number;
    thickness: number;
}

export type TUserEntities = {
    [key: string]: IUserEntity;
};


