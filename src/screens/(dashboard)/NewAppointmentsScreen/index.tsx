import { View, Text, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";

const NewAppointmentsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>New Appointment Screen</Text>
      </View>
    </ScrollView>
  );
};

export default NewAppointmentsScreen;
