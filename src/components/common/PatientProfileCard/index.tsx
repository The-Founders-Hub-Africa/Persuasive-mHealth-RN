import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const PatientProfileCard = () => {
  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.section}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />

        <View
          style={{
            gap: 12,
            flexDirection: "column",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            flexShrink: 1, // Prevents overflow
            maxWidth: "100%",
          }}>
          <Text style={typography.textLG_Medium}>Jane Doe</Text>

          <Text
            style={[
              typography.textSmall_Regular,
              {
                flexWrap: "wrap",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              },
            ]}>
            <EvilIcons
              name="location"
              size={16}
              color={theme.colors["neutral-700"]}
            />
            123 Greenway Avenue, Suite 456, Springfield, IL 62704, USA
          </Text>

          <Text
            style={[
              typography.textSmall_Regular,
              {
                backgroundColor: theme.colors["purple-600"],
                color: "white",
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
                alignSelf: "flex-start", // Prevents unnecessary stretching
                width: "auto",
              },
            ]}>
            Hypertension
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PatientProfileCard;

// stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["purple-200"],
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
    maxWidth: "100%",
  },
  section: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    // maxWidth: "100%",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors["purple-100"],
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  bottomIcon: {
    width: 46,
    height: 46,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
  },
  textarea: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
    width: "100%",
    flexWrap: "wrap",
    textAlignVertical: "top",
    lineHeight: 22,
    height: 150,
  },
});
