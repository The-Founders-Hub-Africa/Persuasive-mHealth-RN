import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import SearchInput from "@/src/components/home/SearchInput";
import { messagesData } from "@/src/helpers";
import MessageList from "@/src/components/common/MessageList";

const MessagesScreen = () => {
  const [canSearch, setCanSearch] = useState(false);

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
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
