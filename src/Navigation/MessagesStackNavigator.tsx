import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageDetailsScreen from "../screens/(dashboard)/MessageDetails";
import MessagesScreen from "../screens/(dashboard)/Messages";

const Stack = createNativeStackNavigator();

const MessagesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Message Details" component={MessageDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
