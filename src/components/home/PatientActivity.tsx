import { View } from "react-native";
import React from "react";
import { SectionHeader } from "../common";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const PatientActivity = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Patient Activity"
        onPress={() => navigation.navigate("Patients")}
      />
    </View>
  );
};

export default PatientActivity;
