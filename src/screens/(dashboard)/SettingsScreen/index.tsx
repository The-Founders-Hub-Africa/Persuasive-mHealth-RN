import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";

const SettingsScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#B91C1C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
  },
});
