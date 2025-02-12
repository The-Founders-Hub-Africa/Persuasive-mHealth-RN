import { View } from "react-native";
import React from "react";
import PatientCard from "../patients/PatientCard";
import { SectionHeader } from "../common";
import { PatientProps } from "@/src/types";

const RecentPatients = ({ patientsData }: { patientsData: PatientProps[] }) => {
  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader title="Recent Patients" url="/patients" />

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
