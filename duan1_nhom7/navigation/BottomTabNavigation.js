import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screen/HomeScreen';
import MusicScreen from '../screen/MusicScreen';
import QuanlyUser from '../screen/SettingScreen';

const BottomTabNavigation = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
        
        screenOptions={({ route }) => ({

        
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home-sharp'
                  : 'home-outline';
              } else if (route.name === 'NewPost') {
                iconName = focused ? 'ios-newspaper-sharp' : 'newspaper-outline';
              } else if (route.name === 'Music') {
                iconName = focused ? 'ios-musical-notes-sharp' : 'musical-notes-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-settings-sharp' : 'settings-outline';
              }
  
              return <Icon name={iconName} size={26} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'grey',
          })}
        
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Music" component={MusicScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Settings" component={QuanlyUser} options={{headerShown: false}} />
        </Tab.Navigator>
      
  )
}

export default BottomTabNavigation