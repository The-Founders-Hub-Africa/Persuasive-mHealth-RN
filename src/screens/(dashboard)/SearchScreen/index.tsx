import { ScrollView, View } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import SearchInput from "@/src/components/home/SearchInput";

const SearchScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <SearchInput />
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
