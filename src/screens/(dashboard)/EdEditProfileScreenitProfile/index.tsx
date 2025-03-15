import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
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
// import { launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-modern-datepicker";
import modalStyles from "@/src/styles/modalStyles";
import theme, { calendarTheme } from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { convertDate, UserProfile } from "@/src/integrations/axios_store";
import { loginUser } from "@/src/integrations/features/user/usersSlice";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import { baseUrl } from "@/src/integrations/features/apis/apiSlice";

type FormData = {
  full_name: string;
  email: string;
  phone_number: string;
  biography: string;
  specialization: string;
  work_experience: number;
  gender: string;
  date_of_birth: string;
  image: string | null;
};

export default function EditProfileScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [imageDetails, setimageDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      biography: user.biography,
      specialization: user.specialization,
      work_experience: user.work_experience,
      gender: user.gender,
      date_of_birth: user.date_of_birth
        ? convertDate(user.date_of_birth)
        : new Date().toISOString().split("T")[0], // Default to today
      image: user.image ? `${baseUrl}${user.image}` : null,
      // image: null,
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

  const handleContinue = async (data: FormData) => {
    let data_ = {
      token: user.usertoken,
      data: {
        formdata: data,
        img: imageDetails,
      },
    };
    // console.log(data_)
    let res = await UserProfile(data_);
    if (res.success) {
      dispatch(
        loginUser({
          ...res.data.user,
          usertoken: res.data.token,
          logedin: true,
          save: true,
        })
      );
      navigation.navigate("Home");
    } else {
      let err = {
        status_code: 500,
        data: { message: "Error occurred" },
        page: "editprofile",
      };
      dispatch(addAlert(err));
      // console.log('Error occurred')
    }

    // let res = await editUser(data_)
    //           if (res.data){
    //               // console.log(res.data)
    //             // setuserlogged(true)

    //           } else if (res.error) {
    //             console.log('error')
    //           }

    // navigation.navigate("Home");
  };

  // const handleImageUpload = async () => {

  //   launchImageLibrary(
  //     {
  //       mediaType: "photo",
  //       includeBase64: false,
  //       quality: 1,
  //     },
  //     response => {
  //       if (response.didCancel) {
  //         console.log("User cancelled image picker");
  //       } else if (response.errorMessage) {
  //         console.log("Image Picker Error: ", response.errorMessage);
  //       } else if (response.assets && response.assets.length > 0) {
  //         const uri = response.assets[0].uri || null;
  //         console.log(response.assets)

  //         let imageData = {

  //         }

  //         // console.log(uri)
  //         setValue("image", uri); // Update the form state with image URI
  //       }
  //     }
  //   );
  // };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let returndata = result.assets[0];
      if (returndata.mimeType && returndata.fileName) {
        const uri = returndata.uri || null;
        setimageDetails({
          type: returndata.mimeType,
          filename: returndata.fileName,
        });
        setValue("image", uri);
      }
    } else {
      console.log("Image Picker Error: ---");
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          { gap: 24, flex: 1, width: "100%" },
        ]}>
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
              name="image"
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
        <View style={{ width: "100%" }}>
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
              name="full_name"
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
            {errors.full_name && (
              <Text style={globalStyles.errorText}>
                {errors.full_name.message}
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
              name="phone_number"
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
                    placeholder="+264812345678"
                    placeholderTextColor={theme.colors["disabled-text"]}
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                    readOnly
                  />
                </View>
              )}
            />
            {errors.phone_number && (
              <Text style={globalStyles.errorText}>
                {errors.phone_number.message?.toString()}
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
        <View style={{ width: "100%" }}>
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

          {/* work_experience */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Years of Experience</Text>
            <Controller
              control={control}
              name="work_experience"
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
            {errors.work_experience && (
              <Text style={globalStyles.errorText}>
                {errors.work_experience.message?.toString()}
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
                    onPress={() => onChange("male")}
                    style={[formStyles.inputCntr, formStyles.genderOptionMale]}>
                    <MaterialIcons
                      name={
                        value === "male"
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={20}
                      color={theme.colors["purple-700"]}
                    />
                    <Text style={formStyles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange("female")}
                    style={[
                      formStyles.inputCntr,
                      formStyles.genderOptionFemale,
                    ]}>
                    <MaterialIcons
                      name={
                        value === "female"
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
                  name="date_of_birth"
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
              <DatePicker
                style={{ borderRadius: 10 }}
                current={getValues("date_of_birth")}
                options={{
                  textHeaderColor: theme.colors["purple-700"],
                  textDefaultColor: theme.colors["neutral-700"],
                  selectedTextColor: "#fff",
                  mainColor: theme.colors["purple-700"],
                  textSecondaryColor: theme.colors["neutral-500"],
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
                onSelectedChange={(date: string) => {
                  setValue("date_of_birth", date);
                  setCalendarVisible(false);
                }}
                mode="calendar"
              />
            </View>
          </Modal>
        </View>

        {/* Continue Button */}
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
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
