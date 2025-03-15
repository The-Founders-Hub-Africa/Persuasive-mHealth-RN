import { View, ScrollView, Text } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import PatientProfileCard from "@/src/components/common/PatientProfileCard";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "@/src/integrations/hooks";
import { get_id } from "@/src/integrations/axios_store";
import Tabs from "@/src/components/common/Tabs";
import PersonalData from "@/src/components/patients/PersonalData";
const PatientDetailsScreen = () => {
  const route = useRoute();
  let param = route.params;
  let id = get_id(param);
  const [patient] = useAppSelector(state =>
    state.patients.data.filter(data => data.id === id)
  );

  const tabs = [
    {
      title: "Personal Data",
      component: <PersonalData patient={patient} />,
    },
    {
      title: "Medical History",
      component: <Text>Coming soon!</Text>,
    },
  ];

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          {
            gap: 24,
          },
        ]}>
        <PatientProfileCard patient={patient} />

        <Tabs tabs={tabs} />
      </View>
    </ScrollView>
  );
};

export default PatientDetailsScreen;
