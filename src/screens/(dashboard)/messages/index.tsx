import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import SearchInput from "@/src/components/search/SearchInput";
import { messagesData } from "@/src/helpers";
import MessageList from "@/src/components/messages/MessageList";

const MessagesScreen = () => {
  const [canSearch, setCanSearch] = useState(false);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {/* Search input */}
        {canSearch && <SearchInput />}

        {/* Messages */}
        <Text>
          <MessageList messagesData={messagesData} />
        </Text>
      </View>
    </ScrollView>
  );
};

export default MessagesScreen;
