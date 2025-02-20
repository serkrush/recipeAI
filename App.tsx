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
import {setBox} from 'src/store/actions';
import NetInfo from '@react-native-community/netinfo';
import Accomplish from 'src/screens/login/Accomplish';
import Age from 'src/screens/login/Age';
import Gender from 'src/screens/login/Gender';
import Goal from 'src/screens/login/Goal';
import Lifestyle from 'src/screens/login/Lifestyle';
import LoveRecipeAI from 'src/screens/login/LoveRecipeAI';
import MealApps from 'src/screens/login/MealApps';
import Notifications from 'src/screens/login/Notifications';
import SprcificDiet from 'src/screens/login/SprcificDiet';
import StoppingYou from 'src/screens/login/StoppingYou';
import Weight from 'src/screens/login/Weight';

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
                                    // screenOptions={{
                                    //     gestureEnabled: true,
                                    //     cardStyleInterpolator: ({ current, layouts }) => ({
                                    //         cardStyle: {
                                    //             transform: [
                                    //                 {
                                    //                     translateX: current.progress.interpolate({
                                    //                         inputRange: [0, 1],
                                    //                         outputRange: [layouts.screen.width, 0],
                                    //                     }),
                                    //                 },
                                    //             ],
                                    //         },
                                    //     }),
                                    // }}
                                    screenOptions={{
                                        gestureEnabled: false,
                                        fullScreenGestureEnabled: false,
                                        animation: 'slide_from_right',
                                    }}
                                    >
                                    <Stack.Screen
                                        name="Tabs"
                                        component={Tabs}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name="Welcome"
                                        component={Welcome}
                                        
                                        options={{headerShown: false,}}
                                    />
                                    <Stack.Screen
                                        name="Accomplish"
                                        component={Accomplish}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="Age"
                                        component={Age}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="Gender"
                                        component={Gender}
                                        options={{headerShown: false, }}
                                    />
                                    <Stack.Screen
                                        name="Goal"
                                        component={Goal}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="Lifestyle"
                                        component={Lifestyle}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="LoveRecipeAI"
                                        component={LoveRecipeAI}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="MealApps"
                                        component={MealApps}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="Notifications"
                                        component={Notifications}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name="SprcificDiet"
                                        component={SprcificDiet}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="StoppingYou"
                                        component={StoppingYou}
                                        options={{headerShown: false, animation: 'fade',}}
                                    />
                                    <Stack.Screen
                                        name="Weight"
                                        component={Weight}
                                        options={{headerShown: false, animation: 'fade',}}
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
