import { View } from "react-native";
import React from "react";
import PatientCard from "../common/PatientCard";
import SectionHeader from "../common/SectionHeader";
import { PatientProps } from "@/src/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const RecentPatients = ({ patientsData }: { patientsData: PatientProps[] }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Recent Patients"
        onPress={() => navigation.navigate("Patients")}
      />

      <View
        style={{
          gap: 4,
          width: "100%",
        }}>
        {patientsData.slice(0, 3).map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </View>
    </View>
  );
};

export default RecentPatients;
