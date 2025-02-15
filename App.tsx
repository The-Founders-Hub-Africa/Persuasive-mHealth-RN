import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignupScreen from "./src/screens/(auth)/SignupScreen";
import LoginScreen from "./src/screens/(auth)/LoginScreen";
import ResetPasswordScreen from "./src/screens/(auth)/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/(auth)/ForgotPasswordScreen";
import OTPVerificationScreen from "./src/screens/(auth)/OTPVerificationScreen";
import ProfileSetupScreen from "./src/screens/(dashboard)/ProfileSetupScreen";
import BottomTabs from "./src/components/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "./src/integrations/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerShadowVisible: false, // ✅ Removes the shadow
              headerTitle: "", // ✅ Hides the title
            }}
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="OTP Verification"
            component={OTPVerificationScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPasswordScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Reset Password"
            component={ResetPasswordScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Profile Setup"
            component={ProfileSetupScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
