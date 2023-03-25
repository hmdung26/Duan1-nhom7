import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../screens/HomeScreens';
import Login from '../components/Login';
import BottomTabNavigator from './BottomTabNavigation';
import SignUpScreen from '../screens/SignUpScreen';
import SettingScreen from '../screens/SettingScreen';
import CommentScreen from '../screens/CommentScreen';
import PostScreen from '../screens/PostScreen';
import UpdatePost from '../screens/UpdateScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Logout" component={Login} />
        <Stack.Screen name="Comment" component={CommentScreen} />
        <Stack.Screen name="Posts" component={PostScreen} />
        <Stack.Screen name="Update" component={UpdatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

const styles = StyleSheet.create({})