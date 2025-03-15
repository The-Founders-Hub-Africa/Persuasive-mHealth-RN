import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";

import { useLoginMutation } from "@/src/integrations/features/apis/apiSlice";
import { loginUser } from "@/src/integrations/features/user/usersSlice";
// import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import Alert_System from "@/src/integrations/features/alert/Alert";
import Toast from "react-native-toast-message";

type FormData = {
  phone_number: string;
  password: string;
};

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.logedin) {
      if (user.verified_number) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("OTP Verification");
      }
    }
  }, [user]);
  // const onSubmit = (data: FormData) => {
  //   if (data.phone_number && data.password) {
  //     navigation.navigate("Dashboard");
  //   } else {
  //     Alert.alert("Please fill all fields");
  //   }
  // };

  const [login, { isLoading }] = useLoginMutation();

  // const onSubmit = async (formdata: FormData) => {
  //   navigation.navigate("Dashboard");
  // };

  const onSubmit = async (formdata: FormData) => {
    if (!formdata.phone_number && !formdata.password) {
      // remember to dispatch alert
      Alert.alert("Please fill all fields");
      return;
    }

    const data = {
      phone_number: formdata.phone_number,
      password: formdata.password,
    };

    let res = await login(data);
    if (res.data) {
      dispatch(
        loginUser({
          ...res.data.user,
          usertoken: res.data.token,
          logedin: true,
          save: true,
        })
      );
      // setuserlogged(true)
      navigation.navigate("Dashboard");
    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "login" }));
    }
  };

  return (
    <ScrollView>
      <Alert_System />
      <View style={[globalStyles.container]}>
        <Image
          source={require("@/assets/purpleLogoIcon.png")}
          style={globalStyles.logoRect}
        />

        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "center",
              marginBottom: 8,
            },
          ]}>
          Welcome back!
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}>
          Sign in to continue.
        </Text>

        <Toast />

        {/* Number Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <View style={formStyles.inputCntr}>
            <SimpleLineIcons
              name="phone"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="+264812345678"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone_number"
            />
          </View>
          {errors.phone_number && (
            <Text style={globalStyles.errorText}>
              {errors.phone_number?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Password Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Password</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="********"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
          </View>
          {errors.password && (
            <Text style={globalStyles.errorText}>
              {errors.password?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot Password")}
          style={{ alignSelf: "flex-end" }}>
          <Text style={{ color: theme.colors["purple-700"], fontSize: 14 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={[
            formStyles.submitButton,
            {
              marginTop: 40,
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
            Login
          </Text>
        </TouchableOpacity>

        {/* Don't have an account */}
        <View style={formStyles.infoGroup}>
          <Text style={formStyles.infoText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={formStyles.infoLink}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
