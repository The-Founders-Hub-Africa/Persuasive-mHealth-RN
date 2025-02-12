import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "../styles/typography";
import formStyles from "../styles/formStyles";
import { onboardingData } from "@/src/helpers";

export default function OnboardingScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("Signup");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView>
      <View style={[globalStyles.container]}>
        <Image
          source={onboardingData[index].image}
          style={{
            width: 200,
            height: 200,
            marginBottom: 24,
            alignSelf: "center",
          }}
        />

        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "center",
              marginBottom: 8,
            },
          ]}>
          {onboardingData[index].title}
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 144,
            },
          ]}>
          {onboardingData[index].subTitle}
        </Text>

        <View style={formStyles.buttonsCntr}>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 10,
              backgroundColor: theme.colors["purple-700"],
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.white,
              }}>
              {index === onboardingData.length - 1 ? "Continue" : "Next"}
            </Text>
          </TouchableOpacity>

          {index < onboardingData.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <Text
                style={{ fontSize: 16, color: theme.colors["neutral-700"] }}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
