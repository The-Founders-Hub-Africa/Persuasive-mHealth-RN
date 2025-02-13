import typography from "@/src/styles/typography";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export const SectionHeader = ({
  title,
  onPress,
}: {
  title: string;
  onPress: any;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        width: "100%",
      }}>
      <Text
        style={[
          typography.textLG_Medium,
          {
            width: "auto",
          },
        ]}>
        {title}
      </Text>

      <TouchableOpacity
        onPress={onPress}
        style={[
          typography.textSmall_Light,
          {
            width: "auto",
          },
        ]}>
        <Text>View all</Text>
      </TouchableOpacity>
    </View>
  );
};
