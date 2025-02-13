import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewProfileScreen from "../screens/(dashboard)/ViewProfile";
import EditProfileScreen from "../screens/(dashboard)/EditProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import theme from "../styles/theme";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Pressable } from "react-native";
import SettingsScreen from "../screens/(dashboard)/Settings";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleEditProfile = () => {
    navigation.navigate("Edit Profile");
  };

  const handleViewProfile = () => {
    navigation.navigate("View Profile");
  };

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="View Profile"
        component={ViewProfileScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={handleEditProfile}>
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={handleViewProfile}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
