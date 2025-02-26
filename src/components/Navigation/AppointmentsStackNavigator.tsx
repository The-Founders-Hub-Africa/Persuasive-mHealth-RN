import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentDetailsScreen from "@/src/screens/(dashboard)/AppointmentDetailsScreen";
import AppointmentsScreen from "@/src/screens/(dashboard)/AppointmentsScreen";
import NewAppointmentScreen from "@/src/screens/(dashboard)/NewAppointmentsScreen";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import globalStyles from "@/src/styles/global";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EditAppointmentScreen from "@/src/screens/(dashboard)/EditAppointmentScreen";

const Stack = createNativeStackNavigator();

const AppointmentsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNewAppointment = () => {
    navigation.navigate("Appointments", { screen: "New Appointment" });
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShadowVisible: false }}
      initialRouteName="Appointments">
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleNewAppointment}>
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
        options={() => {
          let name = "Appointment";

          return {
            title: `${name}`,
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
                    <TouchableOpacity
                      onPress={() => Alert.alert("Upload vai WhatsApp")}>
                      <View
                        style={{
                          padding: 8,
                          gap: 4,
                          alignItems: "center",
                          flexDirection: "row",
                        }}>
                        <MaterialIcons
                          name="preview"
                          size={16}
                          color={theme.colors["neutral-700"]}
                        />
                        <Text
                          style={{
                            color: theme.colors["neutral-700"],
                          }}>
                          View
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert("Downloads")}>
                      <View
                        style={{
                          padding: 8,
                          gap: 4,
                          alignItems: "center",
                          flexDirection: "row",
                        }}>
                        <Feather
                          name="download"
                          size={16}
                          color={theme.colors["neutral-700"]}
                        />
                        <Text style={{ color: theme.colors["neutral-700"] }}>
                          Download
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert("Delete")}>
                      <View
                        style={{
                          padding: 8,
                          gap: 4,
                          alignItems: "center",
                          flexDirection: "row",
                        }}>
                        <Feather name="delete" size={16} color={"red"} />
                        <Text style={{ color: "red" }}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ),
          };
        }}
      />
      <Stack.Screen name="New Appointment" component={NewAppointmentScreen} />
      <Stack.Screen name="Edit Appointment" component={EditAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
