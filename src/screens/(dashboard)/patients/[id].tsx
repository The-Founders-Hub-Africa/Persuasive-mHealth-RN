import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const ViewPatientScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Patients Details Screen</Text>
      </View>
    </ScrollView>
  );
};

export default ViewPatientScreen;
