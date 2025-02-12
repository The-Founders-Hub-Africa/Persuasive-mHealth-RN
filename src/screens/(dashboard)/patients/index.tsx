import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const AllPatientsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Patients Screen</Text>
      </View>
    </ScrollView>
  );
};

export default AllPatientsScreen;
