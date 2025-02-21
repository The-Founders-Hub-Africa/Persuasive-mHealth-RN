import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import PatientActivity from "@/src/components/analytics/PatientActivity";
import Demographics from "@/src/components/analytics/Demographics";
import AppointmentAnalysis from "@/src/components/analytics/AppointmentAnalysis";

const AnalyticsScreen = () => {
  return (
    <ScrollView>
      <View style={style.container}>
        <Demographics />
        <PatientActivity />
        <AppointmentAnalysis />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;

const style = StyleSheet.create({
  container: {
    ...globalStyles.dashboardContainer,
    marginBottom: 16,
    gap: 24,
  },
});
