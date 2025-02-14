import { View } from "react-native";
import React from "react";
import globalStyles from "@/src/styles/global";
import { notificationsData } from "@/src/helpers";
import NotificationList from "@/src/components/common/NotificationList";

const NotificationsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <NotificationList notificationsData={notificationsData} />
    </View>
  );
};

export default NotificationsScreen;
