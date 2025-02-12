import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/(dashboard)/home";
import AllPatientsScreen from "../screens/(dashboard)/patients";
import AllAppointmentsScreen from "../screens/(dashboard)/appointments";
import AllMessagesScreen from "../screens/(dashboard)/messages";
import ProfileDetailsScreen from "../screens/(dashboard)/profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Patients") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Appointments") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patients" component={AllPatientsScreen} />
      <Tab.Screen name="Appointments" component={AllAppointmentsScreen} />
      <Tab.Screen name="Messages" component={AllMessagesScreen} />
      <Tab.Screen name="Settings" component={ProfileDetailsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
