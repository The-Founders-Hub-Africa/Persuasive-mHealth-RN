import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignupScreen from "./src/screens/(auth)/SignupScreen";
import LoginScreen from "./src/screens/(auth)/LoginScreen";
import ResetPasswordScreen from "./src/screens/(auth)/resetpasswordscreen";
import ForgotPasswordScreen from "./src/screens/(auth)/ForgotPasswordScreen";
import OTPVerificationScreen from "./src/screens/(auth)/OTPVerificationScreen";
import ProfileSetupScreen from "./src/screens/(dashboard)/ProfileSetupScreen";
import BottomTabs from "./src/components/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "./src/integrations/store";
import AnalyticsScreen from "./src/screens/(dashboard)/AnalyticsScreen";
import ToastManager from "toastify-react-native";
import Alert_System from "./src/integrations/features/alert/Alert";
import DecisionScreen from "./src/screens/decisionscreen";
import * as Linking from "expo-linking";
import { Text } from "react-native";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["mhealth://"],
  };

  return (
    <Provider store={store}>
      <ToastManager textStyle={{ fontSize: 16, width: "100%" }} />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen
            name="DecisionScreen"
            component={DecisionScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
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
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              headerShadowVisible: false,
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
        <Alert_System />
      </NavigationContainer>
    </Provider>
  );
}
