import { View } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import { notificationsData } from "@/src/helpers";
import { ScreenTitle } from "@/src/components/common";
import NotificationList from "@/src/components/notifications/NotificationList";

const NotificationsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenTitle title="Notifications" headerLeft />

      <NotificationList notificationsData={notificationsData} />
    </View>
  );
};

export default NotificationsScreen;
