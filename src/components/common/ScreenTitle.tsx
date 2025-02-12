import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "@/src/styles/theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import typography from "@/src/styles/typography";

type HeaderButtonProps = {
  icon: JSX.Element;
  onPress: () => void;
};

export const ScreenTitle = ({
  headerLeft,
  title,
  headerRight,
}: {
  headerLeft?: boolean;
  title?: string | JSX.Element;
  headerRight?: HeaderButtonProps;
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Left Icon */}
      <View style={[styles.absolute, styles.left]}>
        {headerLeft ? (
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={theme.colors["neutral-700"]}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Title (string or component) */}
      <View>
        {typeof title === "string" ? (
          <Text style={[typography.textXL_Medium, styles.titleText]}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>

      {/* Right Icon */}
      <View style={[styles.absolute, styles.right]}>
        {headerRight ? (
          <TouchableOpacity onPress={headerRight.onPress}>
            {headerRight.icon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    width: "100%",
    position: "relative",
    height: 30,
  },
  titleText: {
    color: theme.colors["neutral-700"],
  },
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  placeholder: {
    width: 24,
  },
});

export default ScreenTitle;
