import { View, Text, Image, Pressable, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Greetings = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors["purple-400"],
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: theme.rounded.medium,
        marginBottom: 8,
      }}>
      <View>
        <Text
          style={
            (typography.textXL_Medium,
            {
              marginBottom: 4,
            })
          }>
          Hello, Dr Jane Doe
        </Text>
        <Text style={typography.textSmall_Light}>How are yu doing today.</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}>
        <Pressable onPress={() => navigation.navigate("Notifications")}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={theme.colors["neutral-700"]}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ProfileDetails")}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{
              width: 46,
              height: 46,
              borderRadius: theme.rounded.medium,
              backgroundColor: theme.colors["purple-100"],
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Greetings;
