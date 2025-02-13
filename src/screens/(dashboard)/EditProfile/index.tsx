import { View, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import EditProfile from "@/src/components/profile/EditProfile";

const EditProfileScreen = () => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <EditProfile />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
