/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useMemo } from 'react';
import { Image, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslation } from 'react-i18next';
import { Icon, PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { AppState, Flag } from 'src/constants';
import ContainerContext from 'src/ContainerContext';
import Welcome from 'src/screens/login/Welcome';
import { colors, families, icons } from 'src/theme';
import container from './src/container';
import './src/i18n';

///!!! TODO  REMOVE THIS LINE !!!!!!
import { LogBox } from 'react-native';
import { setBox } from 'src/store/actions';
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
import ThankYou from 'src/screens/login/ThankYou';
import Congratulations from 'src/screens/login/Congratulations';
import Rate from 'src/screens/login/Rate';
import SignUp from 'src/screens/login/SignUp';
import Main from 'src/screens/tabs/Main';
import RecipesList from 'src/screens/tabs/RicepesList';
import Home from './assets/svg/Home';
import Plus from './assets/svg/Plus';
import AnalyticsSvg from './assets/svg/AnalyticsSvg';
import SettingsSvg from './assets/svg/SettingsSvg';
import Active from './assets/svg/Active';
import palette from 'src/theme/colors/palette';
import { images } from 'src/theme/images';
import Add from 'src/screens/tabs/Add';
import Settings from 'src/screens/tabs/Settings';
import Analytics from 'src/screens/tabs/Analytics';

LogBox.ignoreAllLogs();

const navigator = container.resolve('navigator');
const redux = container.resolve('redux');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="Main"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    switch (route.name) {
                        case 'Main':
                            icon = <Home />;
                            break;
                        case 'Analytics':
                            icon = <AnalyticsSvg />;
                            break;
                        case 'Settings':
                            icon = <SettingsSvg />;
                            break;
                        case 'Add':
                            icon = <Plus />;
                            break;
                    }

                    return React.cloneElement(icon, {
                        fillOpacity: focused ? 1 : 0.48,
                    });
                },
                tabBarActiveTintColor: palette.white,
                tabBarInactiveTintColor: palette.white048,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: families.geist500,
                    lineHeight: 20,
                },
                tabBarStyle: {
                    paddingTop: 12,
                    height: 92,
                    backgroundColor: palette.darkCharcoal064,
                },
            })}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false, title: t('home') }}
            />
            <Tab.Screen
                name="Analytics"
                component={Analytics}
                options={{ headerShown: false, title: t('analytics') }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false, title: t('settings') }}
            />
            <Tab.Screen
                name="Add"
                component={Add}
                // options={{ headerShown: false, title: '' }}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    title: '',
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: -15,
                                marginRight: 28
                            }}
                        >
                            <Image
                                source={images.add}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
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
                onBeforeLift={() => { }}>
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
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="Welcome"
                                        component={Welcome}

                                        options={{ headerShown: false, }}
                                    />
                                    <Stack.Screen
                                        name="Accomplish"
                                        component={Accomplish}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Age"
                                        component={Age}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Gender"
                                        component={Gender}
                                        options={{ headerShown: false, }}
                                    />
                                    <Stack.Screen
                                        name="Goal"
                                        component={Goal}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Lifestyle"
                                        component={Lifestyle}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="LoveRecipeAI"
                                        component={LoveRecipeAI}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="MealApps"
                                        component={MealApps}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Notifications"
                                        component={Notifications}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="SprcificDiet"
                                        component={SprcificDiet}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="StoppingYou"
                                        component={StoppingYou}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Weight"
                                        component={Weight}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="ThankYou"
                                        component={ThankYou}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Congratulations"
                                        component={Congratulations}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="Rate"
                                        component={Rate}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="SignUp"
                                        component={SignUp}
                                        options={{ headerShown: false, animation: 'fade', }}
                                    />
                                    <Stack.Screen
                                        name="RecipesList"
                                        component={RecipesList}
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
