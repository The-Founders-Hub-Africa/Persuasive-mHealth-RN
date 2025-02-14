import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentDetailsScreen from "../../screens/(dashboard)/AppointmentDetails";
import AppointmentsScreen from "../../screens/(dashboard)/Appointments";
import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import theme from "../../styles/theme";
import { Feather } from "@expo/vector-icons";
import NewAppointmentsScreen from "../../screens/(dashboard)/NewAppointment";

const Stack = createNativeStackNavigator();

const AppointmentsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleAppointment = () => {
    navigation.navigate("Appointments", { screen: "Add Appointment" });
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
