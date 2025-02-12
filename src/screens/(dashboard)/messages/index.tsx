import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/src/styles/global";
import { Feather } from "@expo/vector-icons";
import theme from "@/src/styles/theme";
import SearchInput from "@/src/components/search/SearchInput";
import { messagesData } from "@/src/helpers";
import { ScreenTitle } from "@/src/components/common/ScreenTitle";
import MessageList from "@/src/components/messages/MessageList";

const AllMessagesScreen = () => {
  const [canSearch, setCanSearch] = useState(false);

  const showSearchInput = () => {
    setCanSearch(!canSearch);
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {/* screen title */}
        <ScreenTitle
          title="Messages"
          headerLeft
          headerRight={{
            icon: (
              <Feather
                name="search"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            ),
            onPress: showSearchInput,
          }}
        />

        {/* Search input */}
        {canSearch && <SearchInput />}

        {/* Messages */}
        <Text>
          {" "}
          <MessageList messagesData={messagesData} />
        </Text>
      </View>
    </ScrollView>
  );
};

export default AllMessagesScreen;
