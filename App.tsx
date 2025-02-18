/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTranslation} from 'react-i18next';
import {Icon, PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {AppState, Flag} from 'src/constants';
import ContainerContext from 'src/ContainerContext';
import Welcome from 'src/screens/login/Welcome';
import {colors,  icons} from 'src/theme';
import container from './src/container';
import './src/i18n';

///!!! TODO  REMOVE THIS LINE !!!!!!
import {LogBox} from 'react-native';
import Onboarding from 'src/screens/login/Onboarding';
import {setBox} from 'src/store/actions';
import NetInfo from '@react-native-community/netinfo';

LogBox.ignoreAllLogs();

const navigator = container.resolve('navigator');
const redux = container.resolve('redux');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const {t} = useTranslation();

    const notifications = useSelector((state: AppState) => {
        return state.notifications ?? {};
    });
    const notificationsCount = useMemo(() => {
        return Object.values(notifications).length;
    }, [notifications]);

    return (
        <Tab.Navigator
            initialRouteName="Main"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    switch (route.name) {
                        case 'Main':
                            iconName = icons.tabs.main;
                            break;
                        case 'DataAndCharts':
                            iconName = icons.tabs.charts;
                            break;
                        case 'Notifications':
                            iconName = icons.tabs.notifications;
                            break;
                        case 'Settings':
                            iconName = icons.tabs.settings;
                            break;
                        case 'Machines':
                            iconName = icons.tabs.machines;
                            break;
                    }

                    return <Icon source={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.tabBar.active,
                tabBarInactiveTintColor: colors.tabBar.inactive,
            })}>
        </Tab.Navigator>
    );
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('NET STATUS, ', !!state.isConnected);
            redux.dispatch(setBox(Flag.NET_CONNECTED, !!state.isConnected));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <ReduxProvider store={redux.store}>
            <PersistGate
                loading={null}
                persistor={redux.persistor}
                onBeforeLift={() => {}}>
                <PaperProvider>
                    <NavigationContainer ref={navigator.ref}>
                        <>
                            <ContainerContext.Provider value={container}>
                                <Stack.Navigator
                                    initialRouteName="Welcome"
                                    screenOptions={{
                                        gestureEnabled: false,
                                        fullScreenGestureEnabled: false,
                                    }}>
                                    <Stack.Screen
                                        name="Tabs"
                                        component={Tabs}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name="Welcome"
                                        component={Welcome}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name="Onboarding"
                                        component={Onboarding}
                                        options={{headerShown: false}}
                                    />
                                </Stack.Navigator>
                            </ContainerContext.Provider>
                        </>
                    </NavigationContainer>
                </PaperProvider>
            </PersistGate>
        </ReduxProvider>
    );
}

export default App;
