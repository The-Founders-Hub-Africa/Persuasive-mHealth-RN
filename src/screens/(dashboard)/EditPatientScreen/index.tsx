import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const EditPatientScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text>Edit Patient Screen</Text>
      </View>
    </ScrollView>
  );
};

export default EditPatientScreen;
