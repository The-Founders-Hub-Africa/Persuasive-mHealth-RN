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
import theme from "@/src/styles/theme";
import DatePicker from "react-native-modern-datepicker";
import modalStyles from "@/src/styles/modalStyles";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import typography from "@/src/styles/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ModalPopup from "@/src/components/common/ModalPopup";
import {
  Appointments,
  get_id,
  convertDate,
  convertDate2,
} from "@/src/integrations/axios_store";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import * as ImagePicker from "expo-image-picker";
import { addSingleAppointment } from "@/src/integrations/features/appointment/appointmentsSlice";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type FormData = {
  name: string;
  condition: string;
  symptoms: string;
  notes: string;
  // document: string | null;
  date: string;
  time: string;
  mode: string;
};

const EditAppointmentScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [showModal, setShowModal] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [fileDetails, setfileDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const route = useRoute();
  let param = route.params;
  let id = get_id(param);

  const [appointment] = useAppSelector(state =>
    state.appointments.data.filter(data => data.id === id)
  );
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

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
      name: appointment.patient_name,
      condition: appointment.condition,
      symptoms: appointment.symptoms,
      notes: appointment.notes,
      // document: appointment.document,
      date: appointment.date ? convertDate(appointment.date) : "",
      time: appointment.time,
      mode: appointment.mode,
    },
  });

  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true)
    let newData = {
      ...data,
      patient: appointment.patient,
      medical_practitioner: user.id,
      date: convertDate2(data.date),
      status:'pending',
      id: appointment.id,
    };
    let data_ = {
      token: user.usertoken,
      data: {
        formdata: newData,
        img: fileDetails,
      },
    };
    // console.log(data_)
    let res = await Appointments(data_);
    if (res.success) {
      // reset form data here

      //
      setIsSubmitting(false)
      dispatch(addSingleAppointment(res.data.event));
      setShowModal(true);
      navigation.navigate("Appointments");
    } else {
       setIsSubmitting(false)
      let err = {
        status: res.status,
        data: res.data,
        page: "edit_appointment_page",
      };
      dispatch(addAlert(err));
      // console.log('Error occurred')
    }
  };

  // const handleImageUpload = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"],
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     let returndata = result.assets[0];
  //     if (returndata.mimeType && returndata.fileName) {
  //       const uri = returndata.uri || null;
  //       setfileDetails({
  //         type: returndata.mimeType,
  //         filename: returndata.fileName,
  //       });
  //       setValue("document", uri);
  //     }
  //   } else {
  //     console.log("Image Picker Error: ---");
  //   }
  // };

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
        {/* <View style={formStyles.inputGroup}>
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
        </View> */}

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
            <DatePicker
              style={{ borderRadius: 10 }}
              current={getValues("date")}
              options={{
                textHeaderColor: theme.colors["purple-700"],
                textDefaultColor: theme.colors["neutral-700"],
                selectedTextColor: "#fff",
                mainColor: theme.colors["purple-700"],
                textSecondaryColor: theme.colors["neutral-500"],
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              onSelectedChange={(date: string) => {
                setValue("date", date);
                setCalendarVisible(false);
              }}
              mode="calendar"
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

        {/* Time Modal */}
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}>
          <View style={modalStyles.modalCntr}>
            <DatePicker
              mode="time"
              minuteInterval={5}
              options={{
                textHeaderColor: theme.colors["purple-700"],
                textDefaultColor: theme.colors["neutral-700"],
                selectedTextColor: "#fff",
                mainColor: theme.colors["purple-700"],
                textSecondaryColor: theme.colors["neutral-500"],
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              onTimeChange={time => {
                setValue("time", time);
                setShowPicker(false);
              }}
              style={{ borderRadius: 10 }}
            />
          </View>
        </Modal>

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
          disabled={isSubmitting}
          style={[
            formStyles.submitButton,
            {
              backgroundColor: isSubmitting
                ? theme.colors["disabled-bg"]
                : theme.colors["purple-700"],
            },
          ]}>
          <Text
            style={{
              color: isSubmitting
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}>
            Update Appointment
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Your apointment was successfully updated."
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

export default EditAppointmentScreen;

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
