import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Linking,
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
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
        {/* Top */}
        <TouchableOpacity
          onPress={() => navigation.navigate("View Profile")}
          style={{
            width: "100%",
          }}>
          <View style={styles.profileContainer}>
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
        </TouchableOpacity>

        {/* Account */}
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Edit Profile")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Profile</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Security")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <Feather
                  name="lock"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Security</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Notification Settings")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <Feather
                  name="bell"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Notifications</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Agreement */}
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>Agreement</Text>

          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Privacy & Policy")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Privacy & policy</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Support & Legal")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <FontAwesome
                  name="balance-scale"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Support & legal</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("Terms & Conditions")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <FontAwesome
                  name="balance-scale"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>Terms & Conditions</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Help center */}
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>Help center</Text>

          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => navigation.navigate("FAQ")}>
            <View style={styles.groupSectionLeft}>
              <View>
                <MaterialCommunityIcons
                  name="check-decagram-outline"
                  size={16}
                  color={theme.colors["neutral-500"]}
                />
              </View>
              <Text>FAQ</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.groupSectionLink}
            onPress={() => {
              const url = `https://wa.me/${user.api_number}`; // Replace with your WhatsApp link
              Linking.openURL(url).catch(err =>
                console.error("Failed to open URL:", err)
              );
            }}>
            <View style={styles.groupSectionLeft}>
              <View>
                <Image
                  source={require("@/assets/images/whatsapp.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </View>
              <Text>WhatsApp Assistant</Text>
            </View>
            <View style={styles.groupSectionRight}>
              <Entypo
                name="chevron-right"
                size={16}
                color={theme.colors["neutral-500"]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          disabled={isLoading}
          style={[
            styles.submitButton,
            {
              backgroundColor: isLoading
                ? theme.colors["disabled-bg"]
                : theme.colors["purple-700"],
            },
          ]}>
          <Text
            style={{
              color: isLoading
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}>
            Logout
          </Text>
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

  groupSection: {
    width: "100%",
    gap: 8,
  },
  groupSectionTitle: {
    ...typography.textSmall_Medium,
    marginBottom: 8,
  },
  groupSectionLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors["purple-200"],
    borderRadius: 10,
    padding: 16,
  },
  groupSectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  groupSectionRight: {
    alignSelf: "flex-end",
  },
});
