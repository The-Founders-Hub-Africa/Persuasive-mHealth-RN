import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const PatientDetailsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text>Patients Details Screen</Text>
      </View>
    </ScrollView>
  );
};

export default PatientDetailsScreen;
