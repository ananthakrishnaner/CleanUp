import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from 'lucide-react-native';

import ClientHomeScreen from '../screens/Client/ClientHomeScreen';
import ProfileScreen from '../screens/Client/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function ClientNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#2BA3EC', headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={ClientHomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
