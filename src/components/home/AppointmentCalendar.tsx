import { Text, View } from "react-native";
import React, { useState } from "react";
import { SectionHeader } from "../common";
import { Calendar } from "react-native-calendars";
import theme, { calendarTheme } from "@/src/styles/theme";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const AppointmentCalendar = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [selected, setSelected] = useState({
    "2025-02-01": { selected: true, selectedColor: theme.colors["purple-700"] },
    "2025-02-02": { selected: true, selectedColor: theme.colors["yellow-600"] },
    "2025-02-03": { selected: true, selectedColor: theme.colors["purple-700"] },
  });

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Appointments"
        onPress={() => navigation.navigate("Appointments")}
      />

      <Calendar
        style={{
          borderRadius: theme.rounded.medium,
          boxShadow: "0px 25px 25px 0px #00000026",
        }}
        theme={calendarTheme}
        renderArrow={(direction: string) => (
          <Feather
            name={direction === "left" ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors["neutral-700"]}
          />
        )}
        current={"2025-02-01"}
        markedDates={selected}
        enableSwipeMonths
        onDayPress={(day: any) => {
          console.log("selected day", day);
        }}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Entypo
            name="dot-single"
            size={24}
            color={theme.colors["purple-700"]}
          />
          <Text>Appointments</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Entypo
            name="dot-single"
            size={24}
            color={theme.colors["yellow-600"]}
          />
          <Text>Surgeries</Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentCalendar;
