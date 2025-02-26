import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { logoutUser } from "@/src/integrations/features/user/usersSlice";
import { useLogoutMutation } from "@/src/integrations/features/apis/apiSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import typography from "@/src/styles/typography";
import { Ionicons } from "@expo/vector-icons";
import formStyles from "@/src/styles/formStyles";

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [value, setValue] = React.useState("");

  const [logout, { isLoading }] = useLogoutMutation();
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    let res = await logout(user.usertoken);
    dispatch(logoutUser());
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View
          style={{
            width: "100%",
          }}>
          <TouchableOpacity
            style={globalStyles.searchInputCntr}
            activeOpacity={0.7}>
            <View
              style={[
                globalStyles.searchIconCntr,
                {
                  borderRightWidth: 1,
                },
              ]}>
              <Ionicons
                name="search"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
            <TextInput
              style={[typography.textSmall_Light, globalStyles.searchInput]}
              placeholder="Search"
              value={value}
              onChangeText={setValue}
              placeholderTextColor={theme.colors["neutral-500"]}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors["purple-700"],
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
                height: "100%",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <Text style={formStyles.submitText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          {/* Top */}
          <View style={styles.section}>
            <Image
              source={require("@/assets/images/avatar.png")}
              style={styles.avatar}
            />

            <View>
              <Text style={typography.textLG_Medium}>{user.full_name}</Text>
              <Text style={typography.textBase_Regular}>
                {user.specialization}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.submitButton}>
          <Text style={styles.submitText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
  },
  section: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
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
