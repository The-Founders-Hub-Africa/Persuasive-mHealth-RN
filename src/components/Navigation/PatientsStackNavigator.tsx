import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientDetailsScreen from "../../screens/(dashboard)/PatientDetails";
import PatientsScreen from "../../screens/(dashboard)/Patients";

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
