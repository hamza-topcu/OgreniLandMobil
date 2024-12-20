import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import PaymentScreenn from './src/screen/PaymentScreenn';
import { StripeProvider } from "@stripe/stripe-react-native";
import GameDetails from './src/screen/GameDetails';
import AboutScreen from './src/screen/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <StripeProvider publishableKey="pk_test_51QSMbo09mr35rCE03JCWKbuEdPoxdKHhlQc1J6cHnrSClVpfFcjUHS87mtgnTRFgFjy95RZbpfqggWEXRuiHVS7f00dlIDmGNQ">
      </StripeProvider>

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreenn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameDetails"
          component={GameDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
