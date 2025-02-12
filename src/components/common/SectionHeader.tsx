import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import typography from "@/src/styles/typography";

export const SectionHeader = ({ title, url }: { title: string; url: any }) => {
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

      <Link
        href={url}
        style={[
          typography.textSmall_Light,
          {
            width: "auto",
          },
        ]}>
        <Text>View all</Text>
      </Link>
    </View>
  );
};
