import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
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
import { TimerPickerModal } from "react-native-timer-picker";
import { launchImageLibrary } from "react-native-image-picker";
import typography from "@/src/styles/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ModalPopup from "@/src/components/common/ModalPopup";

type FormData = {
  name: string;
  condition: string;
  symptoms: string;
  notes: string;
  document: string | null;
  date: string;
  time: string;
  mode: string;
};

const NewAppointmentsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      condition: "",
      symptoms: "",
      notes: "",
      document: null,
      date: "",
      time: "",
      mode: "",
    },
  });

  const handleContinue = async (data: FormData) => {
    console.log("Form Data:", data);
    setShowModal(true);
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
            rules={{ required: "Patient name is required" }}
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

        {/* Medical Condition */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Medical Condition</Text>
          <Controller
            control={control}
            name="condition"
            rules={{ required: "Medical condition is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={formStyles.inputText}
                  placeholder="Diabetes, Hypertension, etc."
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.condition && (
            <Text style={globalStyles.errorText}>
              {errors.condition.message}
            </Text>
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
                  style={formStyles.inputText}
                  placeholder="Fever, Cough, Headache"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
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

        {/* Notes */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Notes</Text>
          <Controller
            control={control}
            name="notes"
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
          {errors.notes && (
            <Text style={globalStyles.errorText}>{errors.notes.message}</Text>
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
          <Text style={formStyles.label}>Select Date</Text>
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
                rules={{ required: "Date is required" }}
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>
                    {value || "Select Date"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.date && (
            <Text style={globalStyles.errorText}>{errors.date.message}</Text>
          )}
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
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Time</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="time-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="time"
                rules={{ required: "Time is required" }}
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>
                    {value || "Select Time"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.time && (
            <Text style={globalStyles.errorText}>{errors.time.message}</Text>
          )}
        </View>

        <TimerPickerModal
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={pickedDuration => {
            setValue("time", formatTime(pickedDuration));
            setShowPicker(false);
          }}
          modalTitle="Select Time"
          onCancel={() => setShowPicker(false)}
          closeOnOverlayPress
          use12HourPicker
          styles={{
            confirmButton: {
              backgroundColor: theme.colors["purple-700"],
              color: theme.colors.white,
              borderWidth: 0,
            },
          }}
        />

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

        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Your apointment was successfully created."
          showModal={showModal}
          setShowModal={setShowModal}
          onPress={() => {
            setShowModal(false);
          }}
        />
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
