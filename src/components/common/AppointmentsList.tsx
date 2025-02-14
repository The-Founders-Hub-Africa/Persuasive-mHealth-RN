import { View } from "react-native";
import React from "react";
import { AppointmentProps } from "@/src/types";
import AppointmentCard from "./AppointmentCard";

const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  return (
    <View
      style={{
        marginTop: 16,
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} />
      ))}
    </View>
  );
};

export default AppointmentsList;
