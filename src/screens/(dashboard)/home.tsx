import { ScrollView, View } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import Greetings from "@/src/components/home/Greetings";
import SearchCard from "@/src/components/home/SearchCard";
import PatientActivity from "@/src/components/home/PatientActivity";
import AppointmentCalendar from "@/src/components/home/AppointmentCalendar";
import RecentAppointments from "@/src/components/home/RecentAppointments";
import RecentPatients from "@/src/components/home/RecentPatients";
import { patientsData, appointmentsData } from "@/src/helpers";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Greetings />
        <SearchCard />

        <View
          style={{
            gap: 24,
            width: "100%",
          }}>
          <PatientActivity />
          <AppointmentCalendar />
          <RecentAppointments appointmentsData={appointmentsData} />
          <RecentPatients patientsData={patientsData} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
