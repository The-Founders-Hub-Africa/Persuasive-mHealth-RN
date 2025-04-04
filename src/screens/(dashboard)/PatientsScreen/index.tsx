import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/src/styles/global";
import SearchInput from "@/src/components/common/SearchInput";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import { addPatients } from "@/src/integrations/features/patient/patientsSlice";
import { usePatientMutation } from "@/src/integrations/features/apis/apiSlice";
import { search_name } from "@/src/integrations/axios_store";
import PatientList from "@/src/components/common/PatientList";

const PatientsScreen = () => {
  const [search, setSearch] = useState("");
  const [patientsApi, { isLoading }] = usePatientMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const patients = useAppSelector((state) => state.patients.data);

  const [state, setState] = useState(patients);

  useEffect(() => {
    if (search) {
      const filtered = patients.filter((elem) =>
        search_name(elem.full_name, search)
      );
      setState(filtered);
    } else {
      setState(patients);
    }
  }, [search]);

  useEffect(() => {
    let data = {
      data: { action: "get_all", data: {} },
      token: user.usertoken,
    };
    if (user.logedin){
    patientsApi(data).then((data) => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "patient_screen" }));
      }

      if (data.data) {
        dispatch(addPatients({ data: data.data, save: true }));
      }
    });
  }
  }, [user]);

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <SearchInput value={search} setValue={setSearch} placeholder="Search" />

        <View
          style={{
            marginVertical: 16,
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              gap: 4,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme.colors["purple-50"],
              borderRadius: theme.rounded.medium,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-account-outline"
              size={24}
              color={theme.colors["purple-700"]}
            />
            <Text
              style={[
                typography.textBase_Medium,
                {
                  textAlign: "center",
                },
              ]}
            >
              {user.patient_count}
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}
            >
              No of patients
            </Text>
          </View>

          <View
            style={{
              gap: 4,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme.colors["purple-50"],
              borderRadius: theme.rounded.medium,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-account-outline"
              size={24}
              color={theme.colors["purple-700"]}
            />
            <Text
              style={[
                typography.textBase_Medium,
                {
                  textAlign: "center",
                },
              ]}
            >
              {user.female_count}
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}
            >
              No of Females
            </Text>
          </View>

          <View
            style={{
              gap: 4,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme.colors["purple-50"],
              borderRadius: theme.rounded.medium,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-account-outline"
              size={24}
              color={theme.colors["purple-700"]}
            />
            <Text
              style={[
                typography.textBase_Medium,
                {
                  textAlign: "center",
                },
              ]}
            >
              {user.male_count}
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}
            >
              No of Males
            </Text>
          </View>
        </View>

        <PatientList patientsData={state} patientPage />
      </View>
    </ScrollView>
  );
};

export default PatientsScreen;
