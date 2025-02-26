import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import PatientProfileCard from "@/src/components/common/PatientProfileCard";
import formStyles from "@/src/styles/formStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const PatientDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          {
            gap: 24,
          },
        ]}>
        <PatientProfileCard />

        {/* <View style={styles.stats}>
          <View
            style={{
              gap: 4,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Feather
              name={"online" === "online" ? "wifi" : "wifi-off"}
              size={20}
              color={theme.colors["purple-700"]}
            />

            <Text
              style={{
                color: theme.colors["purple-700"],
              }}>
              Offline
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}>
            <View
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign
                name="calendar"
                size={20}
                color={theme.colors["neutral-500"]}
              />

              <Text
                style={{
                  color: theme.colors["neutral-500"],
                }}>
                12/03/2015
              </Text>
            </View>

            <View
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign
                name="clockcircleo"
                size={20}
                color={theme.colors["neutral-500"]}
              />

              <Text
                style={{
                  color: theme.colors["neutral-500"],
                }}>
                10:00 am
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            gap: 8,
          }}>
          <Text style={typography.textBase_Medium}>Medical condition</Text>
          <Text style={typography.textSmall_Regular}>Hypertension</Text>
        </View>

        <View
          style={{
            width: "100%",
            gap: 8,
          }}>
          <Text style={typography.textBase_Medium}>Symptoms</Text>
          <Text style={typography.textSmall_Regular}>
            Chest pain, shortness of breath
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}>
          <View style={{ width: "100%" }}>
            <Text style={[typography.textBase_Regular]}>Notes</Text>
            <TextInput
              style={[typography.textBase_Regular, styles.textarea]}
              multiline
              readOnly>
              John Doe is experiencing a persistent dry cough, shortness of
              breath, mild chest discomfort, fatigue, and slight fever over the
              past two weeks. He has a history of hypertension, managed with
              Lisinopril, and was treated for pneumonia two years ago.Currently,
              he is undergoing diagnostic tests to determine the cause of his
              respiratory issues. He has been prescribed Salbutamol (Inhaler)
            </TextInput>
          </View>
        </View> */}

        <TouchableOpacity
          style={formStyles.submitButton}
          onPress={() => navigation.navigate("Edit Patient")}>
          <Text style={formStyles.submitText}>Edit patient</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PatientDetailsScreen;

// stylesheet
const styles = StyleSheet.create({
  stats: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingHorizontal: 6,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
  },
  textarea: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
    width: "100%",
    flexWrap: "wrap",
    textAlignVertical: "top",
    lineHeight: 22,
    height: 150,
  },
});
