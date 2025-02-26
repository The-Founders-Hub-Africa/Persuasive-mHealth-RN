import { ScrollView, StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import SearchInput from "@/src/components/common/SearchInput";
import theme from "@/src/styles/theme";
import { appointmentsData, messagesData, patientsData } from "@/src/helpers";
import PatientCard from "@/src/components/common/PatientList";
import AppointmentsList from "@/src/components/common/AppointmentsList";
import MessageList from "@/src/components/common/MessageList";
import PatientList from "@/src/components/common/PatientList";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const options = ["Patients", "Appointments", "Messages"];
  const [selectedOption, setSelectedOption] = useState("Patients");

  return (
    <ScrollView>
      <View style={style.container}>
        <SearchInput value={search} setValue={setSearch} placeholder="Search" />

        <View style={style.options}>
          {options.map(option => (
            <Pressable
              style={[
                style.option,
                option === selectedOption && style.activeOption,
              ]}
              key={option}
              onPress={() => setSelectedOption(option)}>
              <Text>{option}</Text>
            </Pressable>
          ))}
        </View>

        {selectedOption === "Patients" && (
          <PatientList patientsData={patientsData} />
        )}
        {selectedOption === "Appointments" && (
          <AppointmentsList appointmentsData={appointmentsData} />
        )}
        {selectedOption === "Messages" && (
          <MessageList messagesData={messagesData} />
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const style = StyleSheet.create({
  container: {
    ...globalStyles.dashboardContainer,
    marginBottom: 16,
  },
  options: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    rowGap: 8,
    columnGap: 16,
    width: "100%",
    flexWrap: "wrap",
  },
  option: {
    backgroundColor: theme.colors["neutral-100"],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  activeOption: {
    backgroundColor: theme.colors["purple-200"],
  },
});
