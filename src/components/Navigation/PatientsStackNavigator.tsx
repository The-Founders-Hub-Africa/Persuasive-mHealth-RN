import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientDetailsScreen from "@/src/screens/(dashboard)/PatientDetailsScreen";
import PatientsScreen from "@/src/screens/(dashboard)/PatientsScreen";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import NewPatientScreen from "@/src/screens/(dashboard)/NewPatientScreen";
import EditPatientScreen from "@/src/screens/(dashboard)/EditPatientScreen";
import { get_name } from "@/src/integrations/axios_store";

const Stack = createNativeStackNavigator();

const PatientsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleNewPatient = () => {
    navigation.navigate("Patients", { screen: "New Patient" });
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShadowVisible: false }}
      initialRouteName="Patients">
      <Stack.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleNewPatient}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Patient Details" 
        
        options={({ route }) => {
        
                  let name = get_name(route.params);
                   
                  return {
                    title: `${name} details`,
                  }
        }} 
        
        component={PatientDetailsScreen} />
      <Stack.Screen name="New Patient" component={NewPatientScreen} />
      <Stack.Screen name="Edit Patient"
        options={({ route }) => {
        
                  let name = get_name(route.params);
                   
                  return {
                    title: `${name} (Edit)`,
                  }
        }} 
        component={EditPatientScreen} />
    </Stack.Navigator>
  );
};

export default PatientsStackNavigator;
