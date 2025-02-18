import {ROLE, GRANT, IRoles, IRules} from './types';

export const SUPER = [ROLE.ROOT];

export const roles: IRoles = {
    [ROLE.GUEST]: {
        display: 'guest',
        url: '',
        private: true,
    },

    [ROLE.USER]: {
        display: 'user',
        parent: [ROLE.GUEST],
        url: '/',
        private: true,
    },

    [ROLE.ROOT]: {
        display: 'Admin',
        parent: [ROLE.USER],
        url: '/',
    },
};

export const rules: IRules = {
    /*****************************************************************************************
     ************************************* Other Resources ********************************
     ******************************************************************************************/

    /*****************************************************************************************
     ************************************* MENU and navigation ********************************
     ******************************************************************************************/

     'permission/*/viewer': {
        allow: {
            [ROLE.USER]: [GRANT.ADMIN],
        },
     },

     'permission/*/user': {
        allow: {
            [ROLE.USER]: [GRANT.ADMIN],
        },
     },

     'permission/*/admin': {
        allow: {
            [ROLE.USER]: [GRANT.SUPER_ADMIN],
        },
     },

     'permission/*/super-admin': {
        allow: {
            [ROLE.USER]: [GRANT.SUPER_ADMIN],
        },
     },

    /*****************************************************************************************
     ************************************* ROUTES / URLs resources ****************************
     ******************************************************************************************/

    Main: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Notifications: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Settings: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Tabs: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Welcome: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Onboarding: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    Register: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    ForgotPassword: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-user-permissions': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-language-and-region': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-advanced': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-my-profile': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-notifications': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-software-updates': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    'settings-diagnostic-data': {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    AddDehydrator: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    EditDehydrator: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    SelectNewRightsOwner: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    ChangePassword: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    UpdateUserPermissionsList: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    UpdateUserPermissions: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    GroupScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    GroupsListScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    AddDehydratorListScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    ShareGroupPermission: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    ManualControl: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    PresetsScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    BenchFoodsScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    BenchFoodsDetailsScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    MethodScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    IngredientScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    DescriptionScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    PresetDetailsScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    CategoriesScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    AddCategoriesScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },

    NotAccessedScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },
    DataAndChartsScreen: {
        allow: {
            [ROLE.GUEST]: [GRANT.READ],
        },
    },
};
