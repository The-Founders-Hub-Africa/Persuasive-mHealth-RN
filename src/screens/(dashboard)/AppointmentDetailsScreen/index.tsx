import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const AppointmentDetailsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text>Appointment Details Screen</Text>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetailsScreen;
