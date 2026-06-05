import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';

import AuthNavigator from './AuthNavigator';
import ClientNavigator from './ClientNavigator';
import CleanerNavigator from './CleanerNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const user = useAuthStore((state) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user.role === 'client' ? (
          <Stack.Screen name="ClientApp" component={ClientNavigator} />
        ) : user.role === 'cleaner' ? (
          <Stack.Screen name="CleanerApp" component={CleanerNavigator} />
        ) : (
          <Stack.Screen name="AdminApp" component={AdminNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
