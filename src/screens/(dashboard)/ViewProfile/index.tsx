import { View, ScrollView } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import ViewProfile from "@/src/components/profile/ViewProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import theme from "@/src/styles/theme";
import { ScreenTitle } from "@/src/components/common";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const ViewProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleEditProfile = () => {
    navigation.navigate("Edit Profile");
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>

        {/* <ScreenTitle
          title="Profile"
          headerLeft
          headerRight={{
            icon: (
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            ),
            onPress: handleEditProfile,
          }}
        /> */}

        <ViewProfile />
      </View>
    </ScrollView>
  );
};

export default ViewProfileScreen;
