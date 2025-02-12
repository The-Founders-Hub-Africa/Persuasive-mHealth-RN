import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { Calendar } from "react-native-calendars";
import modalStyles from "@/src/styles/modalStyles";
import theme, { calendarTheme } from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  biography: string;
  specialization: string;
  experience: string;
  gender: string;
  dob: string;
  avatar: string | null;
};

export default function EditProfile() {
  const router = useRouter();
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
      biography: "",
      specialization: "",
      experience: "",
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
    router.push("/home");
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
    <View style={{ gap: 24, flex: 1, width: "100%" }}>
      <View>
        <Text
          style={[
            typography.text2XL_SemiBold,
            { textAlign: "left", marginBottom: 8 },
          ]}>
          Edit Profile
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            { textAlign: "left", marginBottom: 24 },
          ]}>
          Update your profile
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        {/* Upload Avatar */}
        <TouchableOpacity
          style={[
            formStyles.profileImageCntr,
            {
              marginBottom: 8,
            },
          ]}
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

        <View>
          <Text>Edit Image</Text>
        </View>
      </View>

      {/* Personal Information */}
      <View>
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

        {/* Biography */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Biography</Text>
          <Controller
            control={control}
            name="biography"
            rules={{ required: "Biography is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={[
                    formStyles.inputText,
                    { height: 150, textAlignVertical: "top" },
                  ]}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                  multiline={true}
                  numberOfLines={7}
                />
              </View>
            )}
          />
          {errors.biography && (
            <Text style={globalStyles.errorText}>
              {errors.biography.message}
            </Text>
          )}
        </View>
      </View>

      {/* Other Information */}
      <View>
        <Text
          style={[
            typography.textXL_Medium,
            {
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

        {/* Experience */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Years of experience</Text>
          <Controller
            control={control}
            name="experience"
            rules={{ required: "Experience is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputDropdownCntr}>
                <Picker selectedValue={value} onValueChange={onChange}>
                  <Picker.Item value="1" label="1 years" />
                  <Picker.Item value="2" label="2 years" />
                  <Picker.Item value="3" label="3 years" />
                </Picker>
              </View>
            )}
          />
          {errors.experience && (
            <Text style={globalStyles.errorText}>
              {errors.experience.message?.toString()}
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
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleSubmit(handleContinue)}
        style={formStyles.submitButton}>
        <Text style={formStyles.submitText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}
