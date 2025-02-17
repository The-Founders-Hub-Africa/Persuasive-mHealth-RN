import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const PatientsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text>Patients Screen</Text>
      </View>
    </ScrollView>
  );
};

export default PatientsScreen;
