import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import formStyles from "@/src/styles/formStyles";
import { Controller, useForm } from "react-hook-form";
import { Feather, Ionicons } from "@expo/vector-icons";
import theme, { calendarTheme } from "@/src/styles/theme";
import { Calendar } from "react-native-calendars";
import modalStyles from "@/src/styles/modalStyles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import typography from "@/src/styles/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type FormData = {
  name: string;
  symptoms: string;
  document: string | null;
  date: string;
  time: string;
  mode: string;
};

const NewAppointmentsScreen = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      symptoms: "",
      document: null,
      date: new Date().toISOString().split("T")[0], // Default to today's date
      time: "",
      mode: "",
    },
  });

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setTimePickerVisible(false); // Close the picker on Android
    }
    if (selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSelectedTime(selectedDate);
      setValue("time", formattedTime);
    }
  };

  const handleContinue = async (data: FormData) => {
    console.log("Form Data:", data);
  };

  const handleImageUpload = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("Image Picker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri || null;
          setValue("document", uri); // Update the form state with document URI
        }
      }
    );
  };

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        {/* Patient Name */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Patient Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Patient is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <Feather
                  name="user"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={formStyles.inputText}
                  placeholder="John Doe"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.name && (
            <Text style={globalStyles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        {/* Symptoms */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Symptoms</Text>
          <Controller
            control={control}
            name="symptoms"
            rules={{ required: "Symptoms are required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={[
                    formStyles.inputText,
                    { height: 150, textAlignVertical: "top" },
                  ]}
                  placeholder="Fever, Cough, Headache"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={7}
                />
              </View>
            )}
          />
          {errors.symptoms && (
            <Text style={globalStyles.errorText}>
              {errors.symptoms.message}
            </Text>
          )}
        </View>

        {/* Upload Document */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Upload Document</Text>
          <TouchableOpacity
            style={styles.profileImageCntr}
            onPress={handleImageUpload}>
            <Controller
              control={control}
              name="document"
              render={({ field: { value } }) =>
                value ? (
                  <Image source={{ uri: value }} style={styles.profileImage} />
                ) : (
                  <View style={{ gap: 20 }}>
                    <FontAwesome5
                      name="images"
                      size={70}
                      color="black"
                      style={[
                        {
                          color: theme.colors["purple-700"],
                          textAlign: "center",
                        },
                      ]}
                    />

                    <View style={{ gap: 4 }}>
                      <Text style={[typography.textBase_Medium]}>
                        Drop your files here or{" "}
                        <Text
                          style={{
                            color: theme.colors["purple-700"],
                          }}>
                          browse
                        </Text>
                      </Text>
                      <Text
                        style={[
                          typography.textSmall_Medium,
                          {
                            color: theme.colors["neutral-500"],
                            textAlign: "center",
                          },
                        ]}>
                        Maximum size: 50MB
                      </Text>
                    </View>
                  </View>
                )
              }
            />
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Date</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="date"
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>{value}</Text>
                )}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Calendar Modal */}
        <Modal
          visible={calendarVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setCalendarVisible(false)}>
          <View style={modalStyles.modalCntr}>
            <Calendar
              style={{ borderRadius: theme.rounded.medium, width: 300 }}
              theme={calendarTheme}
              renderArrow={(direction: string) => (
                <Feather
                  name={direction === "left" ? "chevron-left" : "chevron-right"}
                  size={24}
                  color={theme.colors["neutral-700"]}
                />
              )}
              current={getValues("date")}
              markedDates={{
                [getValues("date")]: {
                  selected: true,
                  selectedColor: theme.colors["purple-700"],
                },
              }}
              onDayPress={(day: { dateString: string }) => {
                setValue("date", day.dateString);
                setCalendarVisible(false);
              }}
              enableSwipeMonths
            />
          </View>
        </Modal>

        {/* Time Picker */}
        {/* <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Time</Text>
          <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="time-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="time"
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>
                    {value || "Select Time"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Time Picker for iOS */}
        {/* {Platform.OS === "ios" && (
          <Modal visible={timePickerVisible} transparent animationType="slide">
            <View style={modalStyles.modalCntr}>
              <DateTimePicker
                mode="time"
                value={selectedTime}
                onChange={handleTimeChange}
                display="spinner"
              />
              <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
                <Text style={formStyles.submitText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )} */}

        {/* Time Picker for Android */}
        {/* {timePickerVisible && Platform.OS === "android" && (
          <DateTimePicker
            mode="time"
            value={selectedTime}
            onChange={handleTimeChange}
            display="clock"
          />
        )} */}

        {/* Mode Selection */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Mode</Text>
          <Controller
            control={control}
            name="mode"
            rules={{ required: "Mode is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputDropdownCntr}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={formStyles.inputText}>
                  <Picker.Item label="Select mode" value="" />
                  <Picker.Item label="Offline" value="offline" />
                  <Picker.Item label="Online" value="online" />
                </Picker>
              </View>
            )}
          />
          {errors.mode && (
            <Text style={globalStyles.errorText}>{errors.mode.message}</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(handleContinue)}
          style={formStyles.submitButton}>
          <Text style={formStyles.submitText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewAppointmentsScreen;

const styles = StyleSheet.create({
  profileImageCntr: {
    marginBottom: 24,
    height: 200,
    borderRadius: 8,
    backgroundColor: theme.colors["purple-50"],
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
