import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Alert, Pressable, Text } from "react-native";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignupScreen from "./src/screens/(auth)/signup";
import LoginScreen from "./src/screens/(auth)/login";
import ResetPasswordScreen from "./src/screens/(auth)/reset-password";
import ForgotPasswordScreen from "./src/screens/(auth)/forgot-password";
import OTPVerificationScreen from "./src/screens/(auth)/otp-verification";
import ProfileSetupScreen from "./src/screens/(dashboard)/profile-setup";
import HomeScreen from "./src/screens/(dashboard)/home";
import NotificationsScreen from "./src/screens/(dashboard)/notifications";
import SearchScreen from "./src/screens/(dashboard)/search";
import ProfileDetailsScreen from "./src/screens/(dashboard)/profile";
import ViewMessageScreen from "./src/screens/(dashboard)/messages/[id]";
import AllMessagesScreen from "./src/screens/(dashboard)/messages";
import AllAppointmentsScreen from "./src/screens/(dashboard)/appointments";
import ViewAppointmentScreen from "./src/screens/(dashboard)/appointments/[id]";
import AllPatientsScreen from "./src/screens/(dashboard)/patients";
import ViewPatientScreen from "./src/screens/(dashboard)/patients/[id]";
import { Provider } from "react-redux";
import { store } from "./src/integrations/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerRight: () => (
          //   <Pressable onPress={() => Alert.alert("This is a button!")}>
          //     <Text>Info</Text>
          //   </Pressable>
          // ),
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
         
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notification" component={NotificationsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
          <Stack.Screen name="AllMessages" component={AllMessagesScreen} />
          <Stack.Screen name="ViewMessage" component={ViewMessageScreen} />
          <Stack.Screen
            name="AllApointments"
            component={AllAppointmentsScreen}
          />
          <Stack.Screen
            name="ViewAppointment"
            component={ViewAppointmentScreen}
          />
          <Stack.Screen name="AllPatients" component={AllPatientsScreen} />
            <Stack.Screen name="ViewPatient" component={ViewPatientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
