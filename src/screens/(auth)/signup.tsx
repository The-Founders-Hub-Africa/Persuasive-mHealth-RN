import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import formStyles from "@/src/styles/formStyles";
import typography from "@/src/styles/typography";

type FormData = {
  email: string;
  phone: string;
  password: string;
  agreed: boolean;
};

export default function SignupScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = () => {
    navigation.navigate("OTPVerification");
  };

  return (
    <ScrollView>
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
          Create Account
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}>
          Fill your information below
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

        {/* Phone Number Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="phone"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{9,14}$/,
                  message: "Enter a valid phone number",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="+2349012345678"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
          </View>
          {errors.phone && (
            <Text style={globalStyles.errorText}>
              {errors.phone?.message?.toString()}
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

        {/* Terms & Conditions */}
        <Controller
          control={control}
          rules={{
            required: "You must agree to Terms & Conditions",
          }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              onPress={() => onChange(!value)}
              style={{
                flexDirection: "row",
                width: "100%",
              }}>
              <MaterialIcons
                name={value ? "check-box" : "check-box-outline-blank"}
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Text
                style={
                  (typography.textBase_Regular,
                  {
                    marginLeft: 8,
                  })
                }>
                Agree with Terms & Conditions
              </Text>
            </TouchableOpacity>
          )}
          name="agreed"
        />
        {errors.agreed && (
          <Text style={globalStyles.errorText}>
            {errors.agreed?.message?.toString()}
          </Text>
        )}

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            formStyles.submitButton,
            {
              marginTop: 40,
            },
          ]}>
          <Text style={formStyles.submitText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={formStyles.infoGroup}>
          <Text style={formStyles.infoText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={formStyles.infoLink}>Login.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
