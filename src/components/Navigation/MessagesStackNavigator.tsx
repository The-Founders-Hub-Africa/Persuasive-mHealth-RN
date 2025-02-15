import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageDetailsScreen from "../../screens/(dashboard)/MessageDetails";
// import MessagesScreen from "../../screens/(dashboard)/Messages";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import theme from "../../styles/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import MessagesScreen from "@/src/screens/(dashboard)/messages";

const Stack = createNativeStackNavigator();

const MessagesStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSearch = () => {
    navigation.navigate("Messages", {
      canSearch: true,
    });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleSearch}>
              <Feather
                name="search"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Message Details"
        component={MessageDetailsScreen}
        options={{
          title: "John Doe",
        }}
      />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
