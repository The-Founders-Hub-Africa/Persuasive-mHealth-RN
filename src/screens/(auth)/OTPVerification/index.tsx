import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { NavigationProp } from "@react-navigation/native";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";
import modalStyles from "@/src/styles/modalStyles";

type FormData = {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
};

export default function OTPVerificationScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleGetOTP = () => {
    setOtpSent(true);
    setResendTimer(90);
    Toast.show({
      type: "success",
      text1: "OTP Sent",
      text2: "Check your messages.",
    });
  };

  const handleVerifyOTP = (data: { [s: string]: unknown }) => {
    const otpCode = Object.values(data).join("").trim();

    if (otpCode.length === 4) {
      setShowModal(true);
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter a valid 4-digit OTP.",
      });
    }
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Image
          source={require("@/assets/images/otp-icon.png")}
          style={globalStyles.squareImage}
        />
        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "left",
              marginBottom: 8,
            },
          ]}>
          OTP Verification
        </Text>
        {!otpSent ? (
          <>
            <Text
              style={[
                typography.textBase_Regular,
                {
                  textAlign: "left",
                  marginBottom: 24,
                },
              ]}>
              We will send you a one-time password to your registered mobile
              number.
            </Text>

            {/* Phone Number Input */}
            <View style={formStyles.inputGroup}>
              <Text style={formStyles.label}>Phone Number</Text>
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <FontAwesome
                  name="phone"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  value="+63 912 345 6789"
                  editable={false}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleGetOTP}
              style={formStyles.submitButton}>
              <Text style={formStyles.submitText}>Get OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text
              style={[
                typography.textBase_Regular,
                {
                  textAlign: "left",
                  marginBottom: 24,
                },
              ]}>
              Enter the code sent to your mobile number.
            </Text>
            {/* OTP Input Fields */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 16,
              }}>
              {[0, 1, 2, 3].map(index => (
                <Controller
                  key={index}
                  control={control}
                  name={`otp${index}` as keyof FormData} // 👈 Explicitly cast to the valid keys
                  rules={{
                    required: "Required",
                    pattern: { value: /\d/, message: "Only numbers allowed" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      ref={el => (inputRefs.current[index] = el)}
                      style={{
                        width: 50,
                        height: 62,
                        backgroundColor: theme.colors["purple-100"],
                        borderRadius: 8,
                        textAlign: "center",
                        fontSize: 15,
                        color: theme.colors["neutral-500"],
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        if (text && index < 3)
                          inputRefs.current[index + 1]?.focus();
                      }}
                    />
                  )}
                />
              ))}
            </View>
            {errors.otp0 && (
              <Text style={globalStyles.errorText}>OTP is required</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit(handleVerifyOTP)}
              style={[
                formStyles.submitButton,
                {
                  marginTop: 24,
                },
              ]}>
              <Text style={formStyles.submitText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Resend OTP */}
            <View style={formStyles.infoGroup}>
              <Text style={formStyles.infoText}>Didn't receive the OTP? </Text>
              <TouchableOpacity
                disabled={resendTimer > 0}
                onPress={handleGetOTP}>
                <Text
                  style={[
                    formStyles.infoLink,
                    resendTimer > 0 && formStyles.inputTextDisabled,
                  ]}>
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <Toast />

        {/* Success Modal */}
        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          <View style={modalStyles.modalCntr}>
            <View style={modalStyles.modalContent}>
              <Image
                source={require("@/assets/images/success-icon.png")}
                style={modalStyles.modalImage}
              />
              <View style={modalStyles.modalDescription}>
                <Text style={modalStyles.modalTitle}>Success!</Text>
                <Text style={modalStyles.modalText}>
                  Your account was successfully verified, continue to login.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Profile Setup");
                }}
                style={modalStyles.modalButton}>
                <Text style={modalStyles.modalButtonText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
