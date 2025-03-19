import { View, Text, StyleSheet } from "react-native";
import React from "react";
import typography from "@/src/styles/typography";
import theme from "@/src/styles/theme";

const Demographics = () => {
  return (
    <View>
      <Text style={style.title}>Patient Demographics</Text>

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
            Patients
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

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["purple-700"],
              },
            ]}>
            Total No of Patients
          </Text>
          <Text style={style.right}>4033</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["green-600"],
              },
            ]}>
            Total No of Female Patients
          </Text>
          <Text style={style.right}>1500</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["yellow-500"],
              },
            ]}>
            Total No of Male Patients
          </Text>
          <Text style={style.right}>1000</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["pink-600"],
              },
            ]}>
            Total No of Children
          </Text>
          <Text style={style.right}>1000</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["pink-600"],
              },
            ]}>
            Total No of Teenagers
          </Text>
          <Text style={style.right}>1000</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["orange-500"],
              },
            ]}>
            Total No of Adults
          </Text>
          <Text style={style.right}>533</Text>
        </View>
      </View>
    </View>
  );
};

export default Demographics;

const style = StyleSheet.create({
  title: {
    marginBottom: 16,
    ...typography.textLG_Medium,
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
