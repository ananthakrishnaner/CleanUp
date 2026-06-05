import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Briefcase, User } from 'lucide-react-native';

import CleanerDashboardScreen from '../screens/Cleaner/CleanerDashboardScreen';
import CleanerProfileScreen from '../screens/Cleaner/CleanerProfileScreen';

const Tab = createBottomTabNavigator();

export default function CleanerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#5CD0B3', headerShown: false }}>
      <Tab.Screen 
        name="Dashboard" 
        component={CleanerDashboardScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Briefcase color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={CleanerProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
