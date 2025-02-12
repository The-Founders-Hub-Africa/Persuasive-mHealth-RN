import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const ViewAppointmentScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Appointment Details Screen</Text>
      </View>
    </ScrollView>
  );
};

export default ViewAppointmentScreen;
