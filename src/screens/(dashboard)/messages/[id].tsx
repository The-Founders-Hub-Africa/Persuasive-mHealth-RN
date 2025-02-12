import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const ViewMessageScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Message Details Screen</Text>
      </View>
    </ScrollView>
  );
};

export default ViewMessageScreen;
