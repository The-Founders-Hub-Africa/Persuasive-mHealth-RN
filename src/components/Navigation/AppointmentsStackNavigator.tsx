import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentDetailsScreen from "@/src/screens/(dashboard)/AppointmentDetailsScreen";
import AppointmentsScreen from "@/src/screens/(dashboard)/AppointmentsScreen";
import NewAppointmentsScreen from "@/src/screens/(dashboard)/NewAppointmentsScreen";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppointmentsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleAppointment = () => {
    navigation.navigate("Appointments", { screen: "New Appointment" });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleAppointment}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Appointment Details"
        component={AppointmentDetailsScreen}
      />
      <Stack.Screen name="New Appointment" component={NewAppointmentsScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
