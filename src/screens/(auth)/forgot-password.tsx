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
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";

type FormData = {
  email: string;
};

export default function ForgotPasswordScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [emailSent, setEmailSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (data.email) {
      setEmailSent(true);
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  const handleOpenEmailApp = () => {
    navigation.navigate("ResetPassword");
  };

  return (
    <ScrollView>
      {!emailSent ? (
        <View style={globalStyles.container}>
          <Text
            style={[
              typography.text2XL_SemiBold,
              {
                textAlign: "left",
                marginBottom: 8,
              },
            ]}>
            Reset password
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                textAlign: "left",
                marginBottom: 24,
              },
            ]}>
            Ener the email associated with your account and we will send you an
            email wih instructions to reset your password
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

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={formStyles.submitButton}>
            <Text style={formStyles.submitText}>Send instructions</Text>
          </TouchableOpacity>

          {/* Remembered your password */}
          <View style={formStyles.infoGroup}>
            <Text style={formStyles.infoText}>Remembered your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={formStyles.infoLink}>Login here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={globalStyles.container}>
          <Image
            source={require("@/assets/images/email-verification-icon.png")}
            style={globalStyles.squareImage}
          />
          <Text
            style={[
              typography.text2XL_SemiBold,
              {
                textAlign: "center",
                marginBottom: 8,
              },
            ]}>
            Check your mail
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                textAlign: "center",
                marginBottom: 24,
              },
            ]}>
            We have sent a password recovery instruction to your email.
          </Text>
          <TouchableOpacity
            onPress={handleOpenEmailApp}
            style={formStyles.submitButton}>
            <Text style={formStyles.submitText}>Open email app</Text>
          </TouchableOpacity>

          <Text
            style={[
              formStyles.infoGroup,
              {
                textAlign: "center",
              },
            ]}>
            Didn't receive any mail, check your spam filter or try another email
            address
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
