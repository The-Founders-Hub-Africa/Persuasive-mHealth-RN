import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignupScreen from "./src/screens/(auth)/signup";
import LoginScreen from "./src/screens/(auth)/login";
import ResetPasswordScreen from "./src/screens/(auth)/reset-password";
import ForgotPasswordScreen from "./src/screens/(auth)/forgot-password";
import OTPVerificationScreen from "./src/screens/(auth)/otp-verification";
import ProfileSetupScreen from "./src/screens/(dashboard)/profile-setup";
import BottomTabs from "./src/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "./src/integrations/store";

const Stack = createStackNavigator();

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
            name="OTPVerification"
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
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="ProfileSetup"
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
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
