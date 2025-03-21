import React, { useEffect, useState } from "react";
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

import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { useWhatsappRecordsMutation } from "@/src/integrations/features/apis/apiSlice";
import { get_id, get_name } from "@/src/integrations/axios_store";
import { addwhatsappMessage } from "@/src/integrations/features/whatsappMessages/whatsappMessageSlice";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import { getMediaFiles } from "@/src/integrations/mediaFiles";
import VideoScreen from "./videoScreen";
import AudioScreen from "./audioScreen";

const MessageDetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const route = useRoute();

  // remember to uninstall expo-av expo-video-player react-native-sound-player react-native-video

  const [audio, setAudio] = useState<{ [key: number]: string }>({});
  const [image, setImage] = useState<{ [key: number]: string }>({});
  const [video, setVideo] = useState<{ [key: number]: string }>({});

  let param = route.params;
  let id = get_id(param);
  let patientName = get_name(param);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const mgs = useAppSelector(state => state.whatsappMessage);

  const [WhatsappMessage, { isLoading }] = useWhatsappRecordsMutation();

  useEffect(() => {
    let data = {
      data: { action: "get_patient_records", data: { patient_id: id } },
      token: user.usertoken,
    };
    WhatsappMessage(data).then(response => {
      if (response.data) {
        dispatch(addwhatsappMessage(response.data));
        getMediaFiles(
          response.data,
          video,
          setVideo,
          audio,
          setAudio,
          image,
          setImage,
          user.usertoken
        );
      }
      if (response.error) {
        dispatch(addAlert({ ...response.error, page: "message_details" }));
      }
    });
  }, [user]);

  // const handleSaveToProfile = () => {
  //   Toast.show({ type: "success", text1: "Image saved to profile!" });
  //   setSelectedImage(null);
  // };

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={globalStyles.dashboardContainer}>
        <View style={{ gap: 8, width: "100%" }}>
          {mgs.data &&
            mgs.data.map((message, index) => {
              switch (message.record_type) {
                case "text":
                  return (
                    <View
                      key={index}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-700"]
                              : theme.colors["purple-700"],
                          textAlign:
                            message.context == "medical_practitioner"
                              ? "left"
                              : "right",
                        }}>
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors["neutral-500"],
                          marginBlockEnd: 10,
                          textAlign:
                            message.context == "medical_practitioner"
                              ? "left"
                              : "right",
                        }}>
                        {message.timestamp}
                      </Text>
                      <Text key={index}>{message.content}</Text>
                    </View>
                  );
                case "image":
                  return (
                    <View
                      key={index}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }>
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBlockEnd: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBlockEnd: 10,
                              }
                        }>
                        {message.timestamp}
                      </Text>
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedImage("")}>
                        <Image
                          source={{
                            uri: image[message.id],
                          }}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                case "video":
                  return (
                    <View
                      key={index}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}>
                      {" "}
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }>
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBlockEnd: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBlockEnd: 10,
                              }
                        }>
                        {message.timestamp}
                      </Text>
                      <Text>{video[message.id] ? "" : "Loading Video"}</Text>
                      <View>
                        {video[message.id] ? (
                          <VideoScreen videoSource={video[message.id]} />
                        ) : (
                          ""
                        )}
                      </View>
                    </View>
                  );
                case "audio":
                  return (
                    <View
                      key={index}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}>
                      {" "}
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }>
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBlockEnd: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBlockEnd: 10,
                              }
                        }>
                        {message.timestamp}
                      </Text>
                      <Text>{audio[message.id] ? "" : "Audio Video"}</Text>
                      <View>
                        {audio[message.id] ? (
                          <AudioScreen audioSource={audio[message.id]} />
                        ) : (
                          ""
                        )}
                      </View>
                    </View>
                  );
                default:
                  return null;
              }
            })}
        </View>

        {/* Modal for Expanded Image */}
        <Modal visible={!!selectedImage} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}>
            {selectedImage && (
              <View style={styles.modalContent}>
                <Image
                  source={require(`@/assets/images/avatar.png`)}
                  style={styles.expandedImage}
                />
              </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  expandedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: theme.colors["purple-600"],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.rounded.medium,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MessageDetailsScreen;
