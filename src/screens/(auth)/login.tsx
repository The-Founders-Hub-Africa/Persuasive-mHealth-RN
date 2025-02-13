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
import React from "react";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";

import { useLoginMutation } from "@/src/integrations/features/apis/apiSlice";
import { loginUser } from "@/src/integrations/features/user/usersSlice";
// import { useDispatch, useSelector } from "react-redux"
import {useAppDispatch, useAppSelector} from "@/src/integrations/hooks"
import { useEffect } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (data.email && data.password) {
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Please fill all fields");
    }
  };



const [login, { isLoading }] = useLoginMutation()

const dispatch = useAppDispatch();
const user = useAppSelector(state => state.user)
console.log('user',user)

 const data = {data:{
      phone_number: '08132180216',
      password: 'casdonmystery'
}}


  const check = async () => {
    const data = {
      
        phone_number: '08132180216',
        password: 'casdonmystery'
      
    }
    let res = await login(data)
    if (res.data) {
      dispatch(loginUser({
        ...res.data.user,
        'usertoken': res.data.token,
        logedin: true,save:true
      }))
    } else {
      
        console.log('error')
    }
  }

  useEffect(() => {
  check()
  }, [])





  return (
    <ScrollView>
      <View style={globalStyles.container}>
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
          ]}
        >
          Welcome back!
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}
        >
          Sign in to continue.
        </Text>

        {/* Email Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Email</Text>
          <View style={formStyles.inputCntr}>
            <SimpleLineIcons
              name="envelope"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="you@email.com"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={globalStyles.errorText}>
              {errors.email?.message?.toString()}
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
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
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={{ color: theme.colors["purple-700"], fontSize: 14 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            formStyles.submitButton,
            {
              marginTop: 40,
            },
          ]}
        >
          <Text style={[formStyles.submitText]}>Login</Text>
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
