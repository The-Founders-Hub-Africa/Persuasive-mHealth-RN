import React, { useState } from "react";
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
import AnalyticsScreen from "./src/screens/(dashboard)/AnalyticsScreen";
import { Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import globalStyles from "./src/styles/global";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

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
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              headerShadowVisible: false,
              headerRight: () => (
                <View style={{ zIndex: 3, elevation: 3 }}>
                  <TouchableOpacity
                    style={globalStyles.actionsBtn}
                    onPress={() => setMenuVisible(!menuVisible)}>
                    <Feather name="more-vertical" size={24} color="#555" />
                  </TouchableOpacity>

                  {/* Dropdown Menu */}
                  {menuVisible && (
                    <View style={globalStyles.actionsDropdown}>
                      <TouchableOpacity onPress={() => Alert.alert("Share")}>
                        <View
                          style={{
                            padding: 8,
                            gap: 4,
                            alignItems: "center",
                            flexDirection: "row",
                          }}>
                          <Feather name="upload" size={16} color="black" />
                          <Text>Share</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Alert.alert("Download")}>
                        <View
                          style={{
                            padding: 8,
                            gap: 4,
                            alignItems: "center",
                            flexDirection: "row",
                          }}>
                          <Feather name="download" size={16} color="black" />
                          <Text>Download</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ),
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
