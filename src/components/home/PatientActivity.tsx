import { View } from "react-native";
import React from "react";
import { SectionHeader } from "../common";

const PatientActivity = () => {
  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader title="Patient Activity" url="/patients" />
    </View>
  );
};

export default PatientActivity;
