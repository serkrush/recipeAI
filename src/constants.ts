import {ReactNode} from 'react';
import {
    TCycleEntities,
    TUserEntities,
    TRecipeEntities,
    TFormRegisterEntities
} from './entities/EntityTypes';
import {AuthState, RequestStatusState} from './store/types/stateTypes';
import {ViewStyle} from 'react-native';


export enum AuthType {
    Google = 'google',
    Facebook = 'facebook',
    Default = 'email/password',
}

export enum ENTITY {
    RECIPE = 'recipes',
    FORM_REGISTER = 'formRegister',
    USER = 'users',
    IDENTITY = 'identity',
    GROUP = 'groups',
    ACCESS = 'access',
    Cycle = 'cycles',
    NOTIFICATION = 'notifications',
}

export enum Flag {
    LanguageCode = 'language-code',

    UserDeleteProcess = 'user-delete-process',
    GroupDeleteProcess = 'group-delete-process',

    ACTION_START = 'action-start',
    ACTION_SUCCESS = 'action-success',
    ACTION_FAILURE = 'action-failure',

    CurrentUpdatedUserId = 'current-updated-user-id',
    CurrentUpdatedGroupId = 'current-updated-group-id',

    CurrentZone = 'current-zone',
    CurrentScheduleId = 'current-scheduled-id',

    GroupsReceived = 'groups-received',
    DehydratorsReceived = 'dehydrators-received',
    GroupDehydratorsReceived = 'group-dehydrators-received',

    UserInfosReceived = 'user-infos-received',

    ConfirmPairRequested = 'confirm-pair-requested',
    ConfirmResetRequested = 'confirm-pair-requested',
    ProofUploading = 'proof-uploading',
    GetProofs = 'get-proofs',
    ProofFilename = 'proof-filename',

    CountPendingStatusUpdate = 'count-pending-status-update',
    StatusUpdateReceived = 'status-update-received',

    LastStatusUpdateTime = 'last-status-update-time',
    LastStatusUpdateRequestTime = 'last-status-update-request-time',
    StatusUpdateCompleted = 'status-update-completed',

    AppSettings = 'appSettings',
    IsFirstStart = 'isFirstStart',


    NET_CONNECTED = 'net-connected',

    LastResubscribeDevicesIds = 'LastResubscribeDevicesIds',

    AlertModal = 'alert-modal',
}

export enum AlertModalType {
    Error = 'error',
    Message = 'message',
    Info = 'info',
}

export enum RequestStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export enum SettingsOption {
    UserAndPermission = 'user&perm',
    //LanguageAndRegion = 'lang&reg',
    Dehydrators = 'settings-dehyrators',
    Advanced = 'settings-advanced',

    MyProfile = 'settings-my-profile',
    UserPermissions = 'settings-user-permissions',
    Notifications = 'settings-notifications',
    LanguageAndRegion = 'settings-language-and-region',
    SoftwareUpdates = 'settings-software-updates',
    DiagnosticData = 'settings-diagnostic-data',
}

export enum PermissionLevel {
    SuperAdmin = 'super-admin',
    Admin = 'admin',
    User = 'user',
    Viewer = 'viewer',
}

export enum Scale {
    Metric = 'metric',
    Imperial = 'imperial',
}

export enum TimeFormat {
    Format12Hours = '12-hours',
    Format24Hours = '24-hours',
}


export const DEFAULT_LANGUAGE_CODE = 'enUS';
export const DEFAULT_TIMEZONE = 'America/Los_Angeles';
export const DEFAULT_SCALE = 'metric';



export interface AppState {
    box: any;
    auth: AuthState;
    requestStatus: RequestStatusState;
    [ENTITY.USER]: TUserEntities;
    [ENTITY.RECIPE]: TRecipeEntities;
    [ENTITY.FORM_REGISTER]: TFormRegisterEntities;
    [ENTITY.Cycle]: TCycleEntities;
}

export type StoreAction = {
    type: string;
    payload: any;
    entityReducer?: string;
};



export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}


interface ISortParams {
    field: string;
    sort: number;
}

export enum FilterType {
    Text = 'Text',
    Select = 'Select',
    Multiselect = 'Multiselect',
    Touche = 'Touche',
    Radio = 'Radio',
    VerticalRadio = 'VerticalRadio',
    GroupButton = 'GroupButton',
    VerticalGroupButton = 'VerticalGroupButton',
    EllipseButton = 'EllipseButton',
    CheckBox = 'CheckBox',
    Switch = 'Switch',
    VerticalCheckBox = 'VerticalCheckBox',
    FilterReset = 'FilterReset',
    Number = 'Number',
    Button = 'Button',
}
export interface IOptions {
    label: string;
    value: string | number;
}
export interface IMultiselectOptions {
    label: string;
    options: IOptions[];
}
export interface IField {
    label?: string;
    labelIcon?: ReactNode;
    placeholder?: string;
    type?: FilterType;
    initialValue?: any;
    sorted?: boolean;
    rowClassName?: string;
    column?: {
        itemClassName?: string;
        headClassName?: string;
        inputClassName?: string;
        editable?: boolean;
        draw?: (object: any, field?: string) => JSX.Element;
        disabled?: (object: any, field?: string) => void;
        options?: Array<IOptions>;
    };
    filter?: {
        group: string;
        /** container styles */
        className?: string;
        /** container styles */
        // inputClassName?: string;
        styleFilterContainer?: ViewStyle;
        styleFilterItem?: ViewStyle;
        activeClassName?: string;
        labelClassName?: string;
        showLabel?: boolean;
        icon?: InputIcon;
        iconSvg?: ReactNode;
        iconSvgChecked?: ReactNode;
        options?: Array<IOptions | IMultiselectOptions>;
        customFilterEvent?: () => void | undefined;
    };
}
export enum InputIcon {
    USER = 'user',
    PASSPORT = 'passport',
    EDIT = 'edit',
    EMAIL = 'email',
    SPINNER = 'spinner',
    SEARCH = 'search',
    PASSWORD = 'password',
    ERROR = 'error',
}


export enum ServerErrorCode {
}

export enum ServerMessageCode {
}
