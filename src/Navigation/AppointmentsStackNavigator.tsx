import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentDetailsScreen from "../screens/(dashboard)/AppointmentDetails";
import AppointmentsScreen from "../screens/(dashboard)/Appointments";

const Stack = createNativeStackNavigator();

const AppointmentsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen
        name="Appointment Details"
        component={AppointmentDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
