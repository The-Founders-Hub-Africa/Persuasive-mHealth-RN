import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import globalStyles from "@/src/styles/global";
import Greetings from "@/src/components/home/Greetings";
import SearchCard from "@/src/components/home/SearchCard";
import PatientActivity from "@/src/components/Analytics/PatientActivity";
import AppointmentCalendar from "@/src/components/home/AppointmentCalendar";
import RecentAppointments from "@/src/components/home/RecentAppointments";
import RecentPatients from "@/src/components/home/RecentPatients";
import { patientsData, appointmentsData } from "@/src/helpers";
import Alert_System from "@/src/integrations/features/alert/Alert";
import {  usePatientMutation } from "@/src/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import { addPatients } from '@/src/integrations/features/patient/patientsSlice'



const HomeScreen = () => {

   const dispatch = useAppDispatch();
   const user = useAppSelector(state => state.user);
   const patients = useAppSelector(state => state.patients.data);
   const [patientsApi, { isLoading }] = usePatientMutation();

    useEffect(() => {
        let data = {
          data: { action: 'get_all', data:{} },
          token: user.usertoken
        }
        console.log(data.token)
      patientsApi(data).then(data => {
        if (data.error) {
          dispatch(addAlert({ ...data.error, page: "home_screen" }))
      }
        
        if (data.data) {
          dispatch(addPatients({ data: data.data,save:true }))
        }
      })
    
    }, [user])
  
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Alert_System/>
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
