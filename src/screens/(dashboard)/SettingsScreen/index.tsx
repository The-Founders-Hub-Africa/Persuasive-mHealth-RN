import { ScrollView, View, Text } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const SettingsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Settings Screen</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
