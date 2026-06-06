import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PublicHomeScreen from '../screens/Public/PublicHomeScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

export default function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PublicHome"
        component={PublicHomeScreen}
        initialParams={{ onBook: () => {} }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
      />
    </Stack.Navigator>
  );
}