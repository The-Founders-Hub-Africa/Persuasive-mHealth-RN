import { View, Text, StyleSheet } from "react-native";
import React from "react";
import typography from "@/src/styles/typography";
import theme from "@/src/styles/theme";
import { PieChart } from "react-native-gifted-charts";

const AppointmentAnalysis = () => {
  const pieData = [
    {
      value: 85,
      color: theme.colors["purple-700"],
      gradientCenterColor: theme.colors["purple-700"],
      focused: true,
    },
    {
      value: 15,
      color: theme.colors["neutral-300"],
      gradientCenterColor: theme.colors["neutral-300"],
    },
  ];
  return (
    <View>
      <Text style={style.title}>Appointments Analysis</Text>

      <View style={style.container}>
        <View style={style.demographics}>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
                paddingLeft: 8,
              },
            ]}>
            User Activity
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
              },
            ]}>
            02/03/2035
          </Text>
        </View>

        <View style={{ marginHorizontal: "auto", marginVertical: 16 }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={theme.colors["purple-50"]}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: theme.colors["neutral-700"],
                      fontWeight: "bold",
                    }}>
                    85%
                  </Text>
                  <Text style={{ fontSize: 14, color: theme.colors["neutral-700"] }}>
                    Completed
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["purple-700"],
              },
            ]}>
            Completed appointments
          </Text>
          <View
            style={[
              style.right,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              },
            ]}>
            <Text>3033</Text>
            <Text
              style={{
                color: theme.colors["purple-700"],
              }}>
              85%
            </Text>
          </View>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["purple-300"],
              },
            ]}>
            Average response time
          </Text>
          <Text style={style.right}>45 mins</Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentAnalysis;

const style = StyleSheet.create({
  title: {
    marginBottom: 16,
    ...typography.textLG_Medium,
  },
  subTitle: {
    ...typography.textBase_Regular,
  },
  container: {
    backgroundColor: theme.colors["purple-50"],
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderRadius: theme.rounded.medium,
    gap: 16,
    width: "100%",
  },
  demographics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    paddingRight: 8,
  },
  left: {
    ...typography.textSmall_Regular,
    width: "auto",
    borderLeftWidth: 8,
    paddingLeft: 8,
  },
  right: {
    ...typography.textSmall_Regular,
    width: "auto",
  },
});
