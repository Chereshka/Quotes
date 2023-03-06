/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { colors } from './staticData';
import { images } from './images';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { About, Quotes } from './screen';

const Tab = createBottomTabNavigator();

const NO_TITLE = { headerShown: false };

const PAGES = {
    ABOUT: 'About',
    QUOTES: 'Quotes',
};

const App = () => {
    const screenOptions = useCallback(({ route }: { route: RouteProp<ParamListBase, string> }) => ({
        headerTitleStyle: {
            backgroundColor: colors.background,
        },
        tabBarStyle: {
            height: 60,
        },
        tabBarIcon: ({ focused }: { focused: boolean }) => route.name === PAGES.ABOUT ? (
            <Image
                source={focused ? images.about.active : images.about.inactive}
                style={styles.image}
            />
        ) : (
            <Image
                source={focused ? images.quotes.active : images.quotes.inactive}
                style={styles.image}
            />
        ),
        tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Montserrat-Medium',
            marginBottom: 5,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarHideOnKeyboard: true,
    }), []);

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name={PAGES.ABOUT} component={About} options={NO_TITLE} />
                <Tab.Screen name={PAGES.QUOTES} component={Quotes} options={NO_TITLE} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    },
});

export default App;
