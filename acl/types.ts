// import { IUser } from "@/server/models/User";

import {AuthType, Scale} from 'src/constants';

export enum ROLE {
    GUEST = 'guest',
    USER = 'user',
    ROOT = 'root',
}

export enum GRANT {
    VIEWER = 'viewer',
    USER = 'user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super-admin',

    // for business logic
    READ = 'read',
    WRITE = 'write',
    EXECUTE = 'execute',

    // for http requests
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface ISecretRole {
    role: ROLE;
    secret: string;
}

export interface IIdentity {
    userId: any;
    firstName?: string;
    lastName?: string;
    role: ROLE;
    userEmail?: string;
    token?: string;
    secret?: string;
    locale: string;
    timezone: string;
    currencySymbol: string;
    timeFormat: string;
    notificationSettings?: number;
    emailSettings?: number;

    languageCode: string;
    countryCode: string;
    scale: Scale;
    authType: AuthType;
}

export interface IRoleData {
    display: string;
    url: string;
    parent?: ROLE[];
    private?: boolean;
}

export interface IRoles {
    [key: string]: IRoleData;
}

export interface IGrants {
    [key: string]: string[];
}

export interface IAllowDeny {
    allow: IGrants;
    deny?: IGrants;
}

export interface IRules {
    [key: string]: IAllowDeny;
}

export interface IIdentityACL {
    user: IIdentity;
    roles: IRoles;
    rules: IRules;
}


