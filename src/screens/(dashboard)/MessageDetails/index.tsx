import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";

const MessageDetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={{ gap: 8, width: "100%" }}>
          <Text style={[styles.messageText]}>
            Following today's consultation, I've noted your symptoms and
            recommended the following steps: [List of Recommendations]. Please
            feel free to reach out if you have any concerns or require further
            clarification.{" "}
          </Text>

          {/* Image Grid */}
          <View style={styles.imageGrid}>
            {["1", "2", "3", "4"].map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(image)}>
                <Image
                  source={require(`@/assets/images/avatar.png`)}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.messageText]}>
            I've reviewed your recent test results. I recommend adjusting your
            medication dosage to [New Dosage]. Let me know if you have any side
            effects or questions about this change.
          </Text>
        </View>

        {/* Modal for Expanded Image */}
        <Modal visible={!!selectedImage} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}>
            {selectedImage && (
              <Image
                source={require(`@/assets/images/avatar.png`)}
                style={styles.expandedImage}
              />
            )}
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  messageText: {
    ...typography.textBase_Medium,
    backgroundColor: theme.colors["neutral-200"],
    padding: 20,
    borderRadius: 10,
  },
  imageGrid: {
    backgroundColor: theme.colors["neutral-200"],
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors["purple-100"],
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default MessageDetailsScreen;
