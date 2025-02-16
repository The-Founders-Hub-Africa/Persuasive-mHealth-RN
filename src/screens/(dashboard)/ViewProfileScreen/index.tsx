import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import globalStyles from "@/src/styles/global";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";

const ViewProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleEditProfile = () => {
    navigation.navigate("Edit Profile");
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  return (
    <ScrollView>
      <View style={[globalStyles.container, { gap: 24 }]}>
        {/* Top card */}
        <View style={styles.container}>
          {/* Top */}
          <View style={styles.section}>
            <Image
              source={require("@/assets/images/avatar.png")}
              style={styles.avatar}
            />

            <View>
              <Text style={typography.textLG_Medium}>{user.full_name}</Text>
              <Text style={typography.textBase_Regular}>{ user.specialization}</Text>
            </View>
          </View>

          {/* Bottom */}
          <View style={styles.bottomItem}>
            <View style={styles.section}>
              <View style={styles.bottomIcon}>
                <Feather
                  name="user-plus"
                  size={20}
                  color={theme.colors["purple-600"]}
                />
              </View>

              <View>
                <Text style={typography.textLG_Medium}>{user.patient_count}</Text>
                <Text style={typography.textBase_Regular}>Patients</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.bottomIcon}>
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={20}
                  color={theme.colors["purple-600"]}
                />
              </View>

              <View>
                <Text style={typography.textLG_Medium}>{user.work_experience} year(s)</Text>
                <Text style={typography.textBase_Regular}>Work Experience</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mid card */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}>
          <View>
            <Text style={[typography.textBase_Regular]}>Gender</Text>
            <Text style={[typography.textBase_Regular, styles.input]}>
              {user.gender}
            </Text>
          </View>
          <View>
            <Text style={[typography.textBase_Regular]}>Date of birth</Text>
            <Text style={[typography.textBase_Regular, styles.input]}>
              {user.date_of_birth}
            </Text>
          </View>
          <View>
            <Text style={[typography.textBase_Regular]}>Phone number</Text>
            <Text style={[typography.textBase_Regular, styles.input]}>
              {user.phone_number}
            </Text>
          </View>
        </View>

        {/* Biograpgy */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}>
          <View style={{ width: "100%" }}>
            <Text style={[typography.textBase_Regular]}>Biography</Text>
            <Text style={[typography.textBase_Regular, styles.textarea]}>
              {user.biography}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={formStyles.submitButton}>
          <Text style={formStyles.submitText}>View analytics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewProfileScreen;

// stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
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

  input: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  },
});
