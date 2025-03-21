import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import typography from "../styles/typography";
import formStyles from "../styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { boardUser } from "../integrations/features/user/boarderUserSlice";

const onboardingData = [
  {
    id: 1,
    image: require("@/assets/images/onboarding1-icon.png"),
    title: "Your All-in-One Healthcare Assistant",
    subTitle:
      "Manage messages, appointments, and records in one place, saving you time for what matters most",
  },
  {
    id: 2,
    image: require("@/assets/images/onboarding2-icon.png"),
    title: "Simplify Patient Care with Ease",
    subTitle:
      "Integrate your workflow with real-time EMR sync and secure multi-platform communication.",
  },
  {
    id: 3,
    image: require("@/assets/images/onboarding3-icon.png"),
    title: "Let's Get You Set Up for Success",
    subTitle:
      "Follow these simple steps to unlock seamless doctor-patient collaboration and optimize your workflow",
  },
];

export default function OnboardingScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [index, setIndex] = useState(0);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
   const board = useAppSelector(state => state.board);

  
  
  // useEffect(() => {

  //   if (board.navigate && board.boarded && board.registered) {
  //     console.log('ran boarded login')
  //     navigation.navigate("Login");
  //   } else if (board.navigate && board.boarded) {
  //     console.log('ran boarded signup')
  //     navigation.navigate("Signup");
  //   }

  // }, [board])
  
  // useEffect(() => {
  //   if (user.logedin) {
  //     if (user.verified_number && user.full_name != 'Not Set') {
  //       console.log('pushed to Dashboard')
  //       navigation.navigate("Dashboard");
  //     } else if (user.full_name == 'Not Set') {
  //       console.log('profile not Set ooh')
  //       navigation.navigate("Profile Setup");
  //     }else {
  //       navigation.navigate("OTP Verification");
  //     }
  //   }
  // }, [user]);

   useEffect(() => {
    if (user.logedin) {
      if (user.verified_number && user.full_name != 'Not Set') {
        console.log('pushed to Dashboard')
        navigation.navigate("Dashboard");
      } else if (user.full_name == 'Not Set') {
        console.log('profile not Set ooh')
        navigation.navigate("Profile Setup");
      }else {
        navigation.navigate("OTP Verification");
      }
    } else {

      if (board.navigate && board.boarded && board.registered) {
      console.log('ran boarded login')
      navigation.navigate("Login");
    } else if (board.navigate && board.boarded) {
      console.log('ran boarded signup')
      navigation.navigate("Signup");
    }
      
    }
  }, [user,board]);

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("Signup");
      dispatch(boardUser())
    }
  };

  const handleSkip = () => {
    navigation.navigate("Signup");
    dispatch(boardUser())
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
