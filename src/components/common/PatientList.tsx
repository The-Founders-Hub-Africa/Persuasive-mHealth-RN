import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PatientProps } from "@/src/types";
import typography from "@/src/styles/typography";

const PatientList = ({ patientsData }: { patientsData: PatientProps[] }) => {
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {patientsData.map(patient => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </View>
  );
};

export default PatientList;

const PatientCard = ({ patient }: { patient: PatientProps }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Patients", {
          screen: "Patient Details",
          params: { id: patient.id, name: patient.full_name },
        })
      }
      style={{
        backgroundColor: theme.colors["purple-50"],
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: theme.rounded.medium,
        gap: 16,
        position: "relative",
      }}>
      {/* Left */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}>
        {/* Patient Profile Image */}
        <Image
          source={patient.image}
          style={{
            width: 62,
            height: 62,
            borderRadius: theme.rounded.medium,
            backgroundColor: theme.colors["purple-100"],
          }}
        />

        {/* Center: Patient Details */}
        <View style={{ gap: 8 }}>
          <Text style={typography.textBase_Medium}>{patient.full_name}</Text>
          <Text style={typography.textXS_Regular}>
            Last visit: {patient.date}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 4,
              marginTop: 4,
            }}>
            <AntDesign
              name="contacts"
              size={15}
              color={theme.colors["purple-400"]}
            />
            <Text
              style={[
                typography.textXS_Regular,
                {
                  color: theme.colors["purple-400"],
                  width: "auto",
                },
              ]}>
              {patient.whatsapp_number}
            </Text>
          </View>
        </View>
      </View>

      {/* Right: Three Dots Dropdown */}
      <View>
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={globalStyles.actionsBtn}>
          <Feather name="more-vertical" size={24} color="#555" />
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={globalStyles.actionsDropdown}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Patients", {
                  screen: "Edit Patient",
                  params: { id: patient.id, name: patient.full_name },
                })
              }>
              <Text style={{ padding: 8 }}>Edit</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => Alert.alert("Cancel")}>
              <Text style={{ padding: 8, color: "red" }}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
