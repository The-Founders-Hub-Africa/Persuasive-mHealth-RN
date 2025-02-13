import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import { ScreenTitle, Tabs } from "@/src/components/common";
import { Feather } from "@expo/vector-icons";
import theme from "@/src/styles/theme";
import SearchInput from "@/src/components/search/SearchInput";
import AppointmentsList from "@/src/components/appointments/AppointmentsList";
import { appointmentsData } from "@/src/helpers";

const AppointmentsScreen = () => {
  const [addApontment, setAddAppointment] = useState(false);

  const handleAppointment = () => {
    setAddAppointment(!addApontment);
  };

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
        {/* screen title */}
        <ScreenTitle
          title="Appointments"
          headerLeft
          headerRight={{
            icon: (
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            ),
            onPress: handleAppointment,
          }}
        />
        {/* Appointments */}
        <Tabs tabs={tabs} />;
      </View>
    </ScrollView>
  );
};

export default AppointmentsScreen;
