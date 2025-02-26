import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import { patientsData } from "@/src/helpers";
import SearchInput from "@/src/components/home/SearchInput";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PatientProps } from "@/src/types";

const PatientsScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <SearchInput value={search} setValue={setSearch} placeholder="Search" />

        <View
          style={{
            marginVertical: 16,
            flexDirection: "row",
            gap: 24,
            justifyContent: "space-between",
            width: "100%",
          }}>
          <View
            style={{
              gap: 4,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              backgroundColor: theme.colors["purple-50"],
              borderRadius: theme.rounded.medium,
            }}>
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
              ]}>
              655+
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}>
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
            }}>
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
              ]}>
              300
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}>
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
            }}>
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
              ]}>
              250
            </Text>
            <Text
              style={[
                typography.textXS_Regular,
                {
                  textAlign: "center",
                },
              ]}>
              No of Males
            </Text>
          </View>
        </View>

        <PatientList patientsData={patientsData} />
      </View>
    </ScrollView>
  );
};

export default PatientsScreen;

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

const PatientCard = ({ patient }: { patient: PatientProps }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Patient Details");
      }}
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
          <Text style={typography.textBase_Medium}>{patient.name}</Text>
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
              {patient.number}
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
            <TouchableOpacity onPress={() => Alert.alert("Edit")}>
              <Text style={{ padding: 8 }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Cancel")}>
              <Text style={{ padding: 8, color: "red" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
