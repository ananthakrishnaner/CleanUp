import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Settings, Users } from 'lucide-react-native';

import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import AdminSettingsScreen from '../screens/Admin/AdminSettingsScreen';
import CleanerManagementScreen from '../screens/Admin/CleanerManagementScreen';

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#1F8AD0', headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{ tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Cleaners"
        component={CleanerManagementScreen}
        options={{ tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Settings"
        component={AdminSettingsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Settings color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
