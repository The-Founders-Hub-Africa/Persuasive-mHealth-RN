import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import typography from "@/src/styles/typography";
import theme from "@/src/styles/theme";
import { MessageProps } from "@/src/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";


const MessageList = ({ messagesData }: { messagesData: MessageProps[] }) => {
  return (
    <View style={{ width: "100%" }}>
      {messagesData.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </View>
  );
};

export default MessageList;

const MessageCard = ({ message }: { message: MessageProps }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message Details", { id: message.id,name:message.full_name })}
      style={{
      marginBottom: 24,
      }}>
      <View
      style={{
        flexDirection: "row",
        gap: 16,
      }}>
      <Image
        source={require("@/assets/images/avatar.png")}
        style={{
        width: 46,
        height: 46,
        borderRadius: theme.rounded.medium,
        backgroundColor: theme.colors["purple-100"],
        }}
      />

      <View>
        <Text
        style={[
          typography.textBase_Medium,
          {
          marginBottom: 4,
          },
        ]}>
        {message.full_name}
        </Text>
        <Text style={typography.textBase_Regular}>
        {message.record_type == 'text' ? message.content.slice(0, 35) : message.record_type}
        {message.record_type == 'text' ? '....' : ''}
        ...
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};
