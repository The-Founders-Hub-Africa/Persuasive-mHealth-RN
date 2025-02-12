import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { Calendar } from "react-native-calendars";
import theme, { calendarTheme } from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";
import modalStyles from "@/src/styles/modalStyles";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  gender: string;
  dob: string;
  avatar: string | null;
};

export default function ProfileSetupScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialization: "",
      gender: "",
      dob: new Date().toISOString().split("T")[0], // Default to today
      avatar: null,
    },
  });

  // Request permission for image picker
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access camera roll is required!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleContinue = (data: FormData) => {
    console.log("Form Data:", data);
    navigation.navigate("Home");
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
          setValue("avatar", uri); // Update the form state with avatar URI
        }
      }
    );
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text
          style={[
            typography.text2XL_SemiBold,
            { textAlign: "left", marginBottom: 8 },
          ]}>
          Set up Profile
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            { textAlign: "left", marginBottom: 24 },
          ]}>
          Update your profile to get started
        </Text>

        {/* Upload Avatar */}
        <TouchableOpacity
          style={formStyles.profileImageCntr}
          onPress={handleImageUpload}>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { value } }) =>
              value ? (
                <Image
                  source={{ uri: value }}
                  style={formStyles.profileImage}
                />
              ) : (
                <FontAwesome name="user" size={40} color="#a9a9a9" />
              )
            }
          />
        </TouchableOpacity>

        <Text
          style={[
            typography.textXL_Medium,
            {
              marginBottom: 8,
            },
          ]}>
          Personal Information
        </Text>

        {/* Full Name */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full Name is required" }}
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
          {errors.fullName && (
            <Text style={globalStyles.errorText}>
              {errors.fullName.message}
            </Text>
          )}
        </View>

        {/* Email */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <SimpleLineIcons
                  name="envelope"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholder="you@email.com"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  readOnly
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={globalStyles.errorText}>
              {errors.email.message?.toString()}
            </Text>
          )}
        </View>

        {/* Phone Number */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <Controller
            control={control}
            name="phone"
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <Feather
                  name="phone"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholder="+2349012345678"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  readOnly
                />
              </View>
            )}
          />
          {errors.phone && (
            <Text style={globalStyles.errorText}>
              {errors.phone.message?.toString()}
            </Text>
          )}
        </View>

        <Text
          style={[
            typography.textXL_Medium,
            {
              marginTop: 12,
              marginBottom: 8,
            },
          ]}>
          Other Information
        </Text>

        {/* Specialization */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Area of Specialization</Text>
          <Controller
            control={control}
            name="specialization"
            rules={{ required: "Specialization is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputDropdownCntr}>
                <Picker selectedValue={value} onValueChange={onChange}>
                  <Picker.Item label="Cardiology" value="Cardiology" />
                  <Picker.Item label="Neurology" value="Neurology" />
                  <Picker.Item label="Dermatology" value="Dermatology" />
                </Picker>
              </View>
            )}
          />
          {errors.specialization && (
            <Text style={globalStyles.errorText}>
              {errors.specialization.message?.toString()}
            </Text>
          )}
        </View>

        {/* Gender */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.genderCntr}>
                <TouchableOpacity
                  onPress={() => onChange("Male")}
                  style={[formStyles.inputCntr, formStyles.genderOptionMale]}>
                  <MaterialIcons
                    name={
                      value === "Male" ? "check-box" : "check-box-outline-blank"
                    }
                    size={20}
                    color={theme.colors["purple-700"]}
                  />
                  <Text style={formStyles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChange("Female")}
                  style={[formStyles.inputCntr, formStyles.genderOptionFemale]}>
                  <MaterialIcons
                    name={
                      value === "Female"
                        ? "check-box"
                        : "check-box-outline-blank"
                    }
                    size={20}
                    color={theme.colors["purple-700"]}
                  />
                  <Text style={formStyles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.gender && (
            <Text style={globalStyles.errorText}>
              {errors.gender.message?.toString()}
            </Text>
          )}
        </View>

        {/* Date of Birth */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="dob"
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
          transparent={true}
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
              current={getValues("dob")}
              markedDates={{
                [getValues("dob")]: {
                  selected: true,
                  selectedColor: theme.colors["purple-700"],
                },
              }}
              onDayPress={(day: { dateString: string }) => {
                setValue("dob", day.dateString);
                setCalendarVisible(false);
              }}
              enableSwipeMonths
            />
          </View>
        </Modal>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleSubmit(handleContinue)}
          style={formStyles.submitButton}>
          <Text style={formStyles.submitText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
