import { ScrollView, StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import PatientActivity from "@/src/components/home/PatientActivity";
import Demographics from "@/src/components/Analytics/Demographics";

const AnalyticsScreen = () => {
  return (
    <ScrollView>
      <View style={style.container}>
        <Demographics />
        <PatientActivity />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;

const style = StyleSheet.create({
  container: {
    ...globalStyles.dashboardContainer,
    marginBottom: 16,
    gap: 24,
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
