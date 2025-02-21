import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AppointmentProps } from "@/src/types";
import globalStyles from "@/src/styles/global";
import formStyles from "@/src/styles/formStyles";
import typography from "@/src/styles/typography";
import theme from "@/src/styles/theme";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </View>
  );
};

export default AppointmentsList;

const AppointmentCard = ({
  appointment,
}: {
  appointment: AppointmentProps;
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const isPassed = new Date(appointment.date) <= new Date();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Appointments", { screen: "Appointment Details" })
      }
      style={{
        backgroundColor: theme.colors["purple-50"],
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: theme.rounded.medium,
        gap: 16,
        position: "relative",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}>
        {/* Appointment Patient Image */}
        <Image
          source={appointment.image}
          style={{
            width: 62,
            height: 62,
            borderRadius: theme.rounded.medium,
            backgroundColor: theme.colors["purple-100"],
          }}
        />

        {/* Center: Appointment Details */}
        <View style={{ gap: 8 }}>
          <Text style={typography.textBase_Medium}>{appointment.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 4,
              marginTop: 4,
            }}>
            <Feather
              name={appointment.status === "online" ? "wifi" : "wifi-off"}
              size={15}
              color={theme.colors["purple-400"]}
            />
            <Text
              style={[
                typography.textXS_Regular,
                {
                  color: theme.colors["purple-400"],
                  width: "auto",
                },
              ]}>
              {appointment.status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 8,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 4,
                marginTop: 4,
              }}>
              <AntDesign
                name="calendar"
                size={15}
                color={theme.colors["neutral-500"]}
              />
              <Text
                style={[
                  typography.textXS_Regular,
                  {
                    color: theme.colors["neutral-500"],
                    width: "auto",
                  },
                ]}>
                {appointment.date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 4,
                marginTop: 4,
              }}>
              <AntDesign
                name="clockcircleo"
                size={15}
                color={theme.colors["neutral-500"]}
              />
              <Text
                style={[
                  typography.textXS_Regular,
                  {
                    color: theme.colors["neutral-500"],
                    width: "auto",
                  },
                ]}>
                {appointment.time}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Right */}
      {isPassed ? (
        <TouchableOpacity
          style={[
            formStyles.submitButton,
            {
              width: "auto",
              position: "absolute",
              right: 10,
              top: 10,
            },
          ]}>
          <Text
            style={[
              formStyles.submitText,
              typography.textSmall_Medium,
              {
                color: theme.colors.white,
              },
            ]}>
            Reschedule
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={globalStyles.actionsBtn}
            onPress={() => setMenuVisible(!menuVisible)}>
            <Feather name="more-vertical" size={24} color="#555" />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {menuVisible && (
            <View style={globalStyles.actionsDropdown}>
              <TouchableOpacity onPress={() => Alert.alert("Edit")}>
                <Text style={{ padding: 8 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Cancel")}>
                <Text style={{ padding: 8, color: "red" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
