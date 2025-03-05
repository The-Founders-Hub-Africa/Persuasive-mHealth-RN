import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/src/styles/global";
import Tabs from "@/src/components/common/Tabs";
import SearchInput from "@/src/components/common/SearchInput";
// import { appointmentsData } from "@/src/helpers";
import { AppointmentProps } from "@/src/types";
import formStyles from "@/src/styles/formStyles";
import typography from "@/src/styles/typography";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppointmentsMutation } from "@/src/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import { addAppointments } from "@/src/integrations/features/appointment/appointmentsSlice";
import AppointmentCard from "@/src/components/common/AppointmentCard";
import { search_name } from "@/src/integrations/axios_store";
// import { getPatientById } from "@/src/integrations/features/patient/patientsSlice";



const AppointmentsScreen = () => {
  const [search, setSearch] = useState("");
  const [hSearch, setHSearch] = useState("");
  // Filter appointments based on date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const appointmentsData = useAppSelector(state => state.appointments.data);
  const patientsData = useAppSelector(state => state.patients.data);
  const [appointmentApi, { isLoading }] = useAppointmentsMutation();

  // const getPatientById = (patientsData:AppointmentProps, id:number) => patientsData.filter(patient:AppointmentProps => patient.id === id);

   useEffect(() => {
           let data = {
             data: { action: 'get_all', data:{} },
             token: user.usertoken
           }
           console.log(data.token)
         appointmentApi(data).then(data => {
           if (data.error) {
             dispatch(addAlert({ ...data.error, page: "appointment page" }))
         }
           
           if (data.data) {
             dispatch(addAppointments({ data: data.data,save:true }))
           }
         })
       
       }, [user])
// console.log(appointmentsData)
  // Filter for ongoing (upcoming) appointments
 

  const ongoingAppointments = appointmentsData.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= today;
  });

  // Filter for past appointments
  const historyAppointments = appointmentsData.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate < today;
  });

  const [state, setState] = useState({'history': historyAppointments,
    'ongoing': ongoingAppointments
  });
  
  useEffect(() => {
  if (search) {
      const filtered = ongoingAppointments.filter(elem => search_name(elem.patient_name,search))
        setState({...state,ongoing: filtered})
    } else {
     
       setState({...state,ongoing:ongoingAppointments})
    }
  }, [search])


  useEffect(() => {
  
  if (hSearch) {
    const filtered = historyAppointments.filter(elem => search_name(elem.patient_name, hSearch))
        setState({...state,history: filtered})
    } else {
     
       setState({...state,history:historyAppointments})
    }
  }, [hSearch])


  
  const tabs = [
    {
      title: "Ongoing",
      component: (
        <View>
          <SearchInput
            value={search}
            setValue={setSearch}
            placeholder="Search"
          />
          <View
            style={{
              marginTop: 16,
            }}>
            <AppointmentsList appointmentsData={state.ongoing} />
          </View>
        </View>
      ),
    },
    {
      title: "History",
      component: (
        <View>
          <SearchInput
            value={hSearch}
            setValue={setHSearch}
            placeholder="Search"
          />
          <View
            style={{
              marginTop: 16,
            }}>
            <AppointmentsList appointmentsData={state.history} />
          </View>
        </View>
      ),
    },
  ];

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Tabs tabs={tabs} />
      </View>
    </ScrollView>
  );
};

export default AppointmentsScreen;

const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} appointmentPage = {true} />
      ))}
    </View>
  );
};