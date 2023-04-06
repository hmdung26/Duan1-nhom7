import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screen/HomeScreen';
import MusicScreen from '../screen/ThongKeScreen';
import QuanlyUser from '../screen/SettingScreen';
import ThongKeScreen from '../screen/ThongKeScreen';

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
              } else if (route.name === 'Thống kê') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
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
          <Tab.Screen name="Thống kê" component={ThongKeScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Settings" component={QuanlyUser} options={{headerShown: false}} />
        </Tab.Navigator>
      
  )
}

export default BottomTabNavigation