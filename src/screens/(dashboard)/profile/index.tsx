import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import ViewProfile from "@/src/components/profile/ViewProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import theme from "@/src/styles/theme";
import EditProfile from "@/src/components/profile/EditProfile";
import { ScreenTitle } from "@/src/components/common";

const ProfileDetailsScreen = () => {
  const [isEditableView, setIsEditableView] = useState(false);

  const handleEdit = () => {
    setIsEditableView(!isEditableView);
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {/* screen title */}

        {!isEditableView ? (
          <ScreenTitle
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
              onPress: handleEdit,
            }}
          />
        ) : (
          <ScreenTitle
            headerLeft
            headerRight={{
              icon: (
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={theme.colors["neutral-700"]}
                />
              ),
              onPress: handleEdit,
            }}
          />
        )}

        {/* page details */}
        {!isEditableView ? (
          <View>
            <ViewProfile />
          </View>
        ) : (
          <EditProfile />
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileDetailsScreen;
