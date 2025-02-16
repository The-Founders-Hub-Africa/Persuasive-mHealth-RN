import { View, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import Tabs from "@/src/components/common/Tabs";
import SearchInput from "@/src/components/home/SearchInput";
import AppointmentsList from "@/src/components/common/AppointmentsList";
import { appointmentsData } from "@/src/helpers";

const AppointmentsScreen = () => {
  // Filter appointments based on date
  const today = new Date();

  // Filter for ongoing (upcoming) appointments
  const ongoingAppointments = appointmentsData.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= today;
  });

  // Filter for past appointments
  const historyAppointments = appointmentsData.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate < today;
  });

  const tabs = [
    {
      title: "Ongoing",
      component: (
        <View>
          <SearchInput />
          <AppointmentsList appointmentsData={ongoingAppointments} />
        </View>
      ),
    },
    {
      title: "History",
      component: (
        <View>
          <SearchInput />
          <AppointmentsList appointmentsData={historyAppointments} />
        </View>
      ),
    },
  ];

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Tabs tabs={tabs} />
      </View>
    </ScrollView>
  );
};

export default AppointmentsScreen;
