import { View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import theme from "@/src/styles/theme";
import globalStyles from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import typography from "@/src/styles/typography";

const SearchInput = () => {
  return (
    <View
      style={{
        width: "100%",
      }}>
      <TouchableOpacity
        style={globalStyles.searchInputCntr}
        activeOpacity={0.7}>
        <View
          style={[
            globalStyles.searchIconCntr,
            {
              borderRightWidth: 1,
            },
          ]}>
          <Ionicons
            name="search"
            size={16}
            color={theme.colors["neutral-500"]}
          />
        </View>
        <TextInput
          style={[typography.textSmall_Light, globalStyles.searchInput]}
          placeholder="Search..."
          placeholderTextColor={theme.colors["neutral-500"]}
        />
        <View
          style={[
            globalStyles.searchIconCntr,
            {
              borderLeftWidth: 1,
            },
          ]}>
          <Ionicons
            name="filter"
            size={20}
            color={theme.colors["purple-700"]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
