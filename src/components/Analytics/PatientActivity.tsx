import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../common/SectionHeader";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BarChart } from "react-native-gifted-charts";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";

const PatientActivity = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const barData = [
    {
      value: 40,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 20, frontColor: theme.colors["neutral-300"] },
    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 40, frontColor: theme.colors["neutral-300"] },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 25, frontColor: theme.colors["neutral-300"] },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 20, frontColor: theme.colors["neutral-300"] },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 40, frontColor: theme.colors["neutral-300"] },
    {
      value: 65,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: theme.colors["purple-700"],
    },
    { value: 30, frontColor: theme.colors["neutral-300"] },
  ];

  const renderTitle = () => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 20,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 6,
                backgroundColor: theme.colors["purple-700"],
                marginRight: 8,
              }}
            />
            <Text
              style={[
                typography.textSmall_Regular,
                {
                  width: "auto",
                },
              ]}>
              Online Meetings
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 6,
                backgroundColor: theme.colors["slate-300"],
                marginRight: 8,
              }}
            />
            <Text
              style={[
                typography.textSmall_Regular,
                {
                  width: "auto",
                },
              ]}>
              Offline Meetings
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Patient Activity"
        onPress={() => navigation.navigate("Patients")}
      />
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={4}
      />
    </View>
  );
};

export default PatientActivity;
