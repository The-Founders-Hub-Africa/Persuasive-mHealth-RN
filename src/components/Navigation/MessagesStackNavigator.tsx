import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageDetailsScreen from "@/src/screens/(dashboard)/MessageDetailsScreen";
import MessagesScreen from "@/src/screens/(dashboard)/MessagesScreen";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@/src/styles/global";

const Stack = createNativeStackNavigator();

const MessagesStackNavigator = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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
                      <Feather
                        name="upload"
                        size={16}
                        color={theme.colors["neutral-700"]}
                      />
                      <Text style={{ color: theme.colors["neutral-700"] }}>
                        Upload vai WhatsApp
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
                        Downloads
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
        }}
      />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
