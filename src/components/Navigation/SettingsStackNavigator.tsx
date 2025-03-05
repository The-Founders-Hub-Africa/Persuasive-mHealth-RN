import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewProfileScreen from "@/src/screens/(dashboard)/ViewProfileScreen";
import EditProfileScreen from "@/src/screens/(dashboard)/EdEditProfileScreenitProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import theme from "@/src/styles/theme";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import SettingsScreen from "@/src/screens/(dashboard)/SettingsScreen";
import SecurityScreen from "@/src/screens/(dashboard)/SecurityScreen";
import PasswordScreen from "@/src/screens/(dashboard)/PasswordScreen";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleEditProfile = () => {
    navigation.navigate("Settings", { screen: "Edit Profile" });
  };

  const handleViewProfile = () => {
    navigation.navigate("Settings", { screen: "View Profile" });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="View Profile"
        component={ViewProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleEditProfile}>
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleViewProfile}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Change Password" component={PasswordScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
