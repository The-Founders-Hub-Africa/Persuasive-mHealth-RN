import { View } from "react-native";
import React from "react";
import { SectionHeader } from "../common";
import { AppointmentProps } from "@/src/types";
import AppointmentsList from "../appointments/AppointmentsList";

const RecentAppointments = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader title="Upcoming Appointments" url="/appointments" />

      <AppointmentsList appointmentsData={appointmentsData.slice(0, 3)} />
    </View>
  );
};

export default RecentAppointments;
