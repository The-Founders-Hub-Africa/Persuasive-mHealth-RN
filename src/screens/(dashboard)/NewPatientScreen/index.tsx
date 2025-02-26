import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const NewPatientScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text>New Patient Screen</Text>
      </View>
    </ScrollView>
  );
};

export default NewPatientScreen;
