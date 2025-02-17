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
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { logoutUser } from "@/src/integrations/features/user/usersSlice";
import { useLogoutMutation } from "@/src/integrations/features/apis/apiSlice";

const SettingsScreen = () => {

  const [logout, { isLoading }] = useLogoutMutation();
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  
  const handleLogout = async () => {
    let res = await logout(user.usertoken)
    dispatch(logoutUser())
    // please add the navigation below
    
  };

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.submitButton}>
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
