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
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { UserProfile } from "@/src/integrations/axios_store";
import { loginUser } from "@/src/integrations/features/user/usersSlice";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";

type FormData = {
  full_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  gender: string;
  date_of_birth: string;
  image: string | null;
  biography: string,
  work_experience: number
};

export default function ProfileSetupScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: any;
}) {
  const { email, phone_number } = route.params || {};
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [imageDetails, setimageDetails] = useState({type:"",filename:""});
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
      biography: '',
      specialization: user.specialization,
      work_experience: 1,
      gender: user.gender,
      date_of_birth: user.date_of_birth?user.date_of_birth: new Date().toISOString().split("T")[0], // Default to today
      // image: user.image?user.image:null,
      image:null
    },
  });

  useEffect(() => {
    if (email) setValue("email", email);
    if (phone_number) setValue("phone_number", phone_number);
  }, [email, phone_number, setValue]);

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

  // const handleContinue = (data: FormData) => {
  //   console.log("Form Data:", data);
  //   navigation.navigate("Home");
  // };

    const handleContinue = async (data: FormData) => {
      console.log("Form Data:", data);
  
      let formdata = new FormData()
      
      for (const [key, value] of Object.entries(data)) {
        if (key == 'image' && value) {
        
          const imageFiled = {
            name: imageDetails.filename,
            uri: value,
            type: imageDetails.type
          }
          formdata.append(key, imageFiled)
        } else {
          formdata.append(key,value)
        }
      }
      
      let data_ = { token: user.usertoken, data: data }
      // console.log(data_)
      let res = await UserProfile(data_)
      if (res.success) {
           dispatch(loginUser({
                  ...res.data.user,
                  'usertoken': res.data.token,
                  logedin: true, save: true
           })) 
        navigation.navigate("Home");
        
      } else {
        let err = { status_code: 500, data:{message:'Error occurred'},page: 'editprofile' }
        dispatch(addAlert(err))
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

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          let returndata = result.assets[0]
          if (returndata.mimeType && returndata.fileName) {
            const uri = returndata.uri || null;
            setimageDetails({ type: returndata.mimeType, filename: returndata.fileName })
            // setValue("image", uri);
          }
        } else {
          console.log("Image Picker Error: ---"); 
        }
    // launchImageLibrary(
    //   {
    //     mediaType: "photo",
    //     includeBase64: false,
    //     quality: 1,
    //   },
    //   response => {
    //     if (response.didCancel) {
    //       console.log("User cancelled image picker");
    //     } else if (response.errorMessage) {
    //       console.log("Image Picker Error: ", response.errorMessage);
    //     } else if (response.assets && response.assets.length > 0) {
    //       const uri = response.assets[0].uri || null;
    //       setValue("image", uri); // Update the form state with image URI
    //     }
    //   }
    // );
    
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
            render={({ field: { value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <SimpleLineIcons
                  name="envelope"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
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
            render={({ field: { value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <Feather
                  name="phone"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
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
                  <Picker.Item label="Select one" value="" />
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
                  onPress={() => onChange("male")}
                  style={[formStyles.inputCntr, formStyles.genderOptionMale]}>
                  <MaterialIcons
                    name={
                      value === "male" ? "check-box" : "check-box-outline-blank"
                    }
                    size={20}
                    color={theme.colors["purple-700"]}
                  />
                  <Text style={formStyles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChange("female")}
                  style={[formStyles.inputCntr, formStyles.genderOptionFemale]}>
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
              current={getValues("date_of_birth")}
              markedDates={{
                [getValues("date_of_birth")]: {
                  selected: true,
                  selectedColor: theme.colors["purple-700"],
                },
              }}
              onDayPress={(day: { dateString: string }) => {
                setValue("date_of_birth", day.dateString);
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
