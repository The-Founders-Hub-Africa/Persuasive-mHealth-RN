import { View } from "react-native";
import React from "react";
import { SectionHeader } from "../common";
import { AppointmentProps } from "@/src/types";
import AppointmentsList from "../appointments/AppointmentsList";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const RecentAppointments = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Upcoming Appointments"
        onPress={() => navigation.navigate("Appointments")}
      />

      <AppointmentsList appointmentsData={appointmentsData.slice(0, 3)} />
    </View>
  );
};

export default RecentAppointments;
