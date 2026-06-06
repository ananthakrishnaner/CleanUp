import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';

import PublicNavigator from './PublicNavigator';
import ClientNavigator from './ClientNavigator';
import CleanerNavigator from './CleanerNavigator';
import AdminNavigator from './AdminNavigator';
import { ProtectedActionProvider } from '../components/ProtectedAction';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedActionProvider>
      <Suspense fallback={null}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <Stack.Screen name="PublicApp" component={PublicNavigator} />
            ) : user.role === 'client' ? (
              <Stack.Screen name="ClientApp" component={ClientNavigator} />
            ) : user.role === 'cleaner' ? (
              <Stack.Screen name="CleanerApp" component={CleanerNavigator} />
            ) : (
              <Stack.Screen name="AdminApp" component={AdminNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </ProtectedActionProvider>
  );
}
