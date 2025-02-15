import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientDetailsScreen from "@/src/screens/(dashboard)/PatientDetailsScreen";
import PatientsScreen from "@/src/screens/(dashboard)/PatientsScreen";

const Stack = createNativeStackNavigator();

const PatientsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Patients" component={PatientsScreen} />
      <Stack.Screen name="Patient Details" component={PatientDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PatientsStackNavigator;
