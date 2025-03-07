import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import typography from "@/src/styles/typography";
import Toast from "react-native-toast-message";
import formStyles from "@/src/styles/formStyles";

// import VideoPlayer, { type VideoPlayerRef } from 'react-native-video-player';
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { useWhatsappRecordsMutation } from "@/src/integrations/features/apis/apiSlice";
import { get_id } from "@/src/integrations/axios_store";
import { addwhatsappMessage } from "@/src/integrations/features/whatsappMessages/whatsappMessageSlice";
// import SoundPlayer from 'react-native-sound-player';
import { AudioPlayer, AudioStatus, useAudioPlayer } from "expo-audio";
import { addAlert } from "@/src/integrations/features/alert/alertSlice";
import Alert_System from "@/src/integrations/features/alert/Alert";
// import { useVideoPlayer, VideoView } from 'expo-video';
import { getMediaFiles } from "@/src/integrations/mediaFiles";
// import { VideoPlayer } from 'expo-video';
import Video from "react-native-video";

const MessageDetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const videoRef = useRef<Video>(null);
  const route = useRoute();

  // remember to uninstall expo-av,expo-video-player,expo-video,
  // expo-audio,react-native-sound-player,

  const [audio, setAudio] = useState<{ [key: number]: string }>({});
  const [image, setImage] = useState<{ [key: number]: string }>({});
  const [video, setVideo] = useState<{ [key: number]: string }>({});

  const [audioPlayer, setaudioPlayer] = useState({
    uri: "",
    id: 0,
    play: false,
    playing: false,
  });
  // const [audioPlayer, setaudioPlayer] = useState<{ [key: number]: AudioPlayer }>({});
  // const [videoPlayer, setvideoPlayer] = useState<{ [key: number]: VideoPlayer }>({});

  const styles_ = StyleSheet.create({
    container: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      paddingTop: 50,
    },
    videoPlayer: {
      // width: 64,
      // height: 48,
      // marginVertical: 10,
    },
  });

  // useEffect(() => {
  //    if (audioPlayer.play) {
  //      player.play()
  //    }
  // }, [audio, video, audioPlayer]);

  // useEffect(() => {
  //    useAudioPlayer('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  // }, [audio, video, audioPlayer, videoPlayer]);
  // let player = useAudioPlayer(audioPlayer.uri?audioPlayer.uri:null);

  // player.addListener("playbackStatusUpdate", status => {
  //   console.log("fired");
  //   if (status.didJustFinish) {
  //     setaudioPlayer({ ...audioPlayer, playing: false });
  //   }
  // });

  // useEffect(() => {
  //   const subscription =
  // }, [player]);

  const handleAudio = (id: number) => {
    if (audioPlayer.id != id && !audioPlayer.playing) {
      setaudioPlayer({ uri: audio[id], id: id, play: true, playing: true });
    }
    if (audio[id] == audioPlayer.uri) {
      // if (player.paused) {
      //   player.play();
      //   setaudioPlayer({ uri: audio[id], id: id, play: false, playing: true });
      // } else {
      //   player.pause();
      //   setaudioPlayer({ uri: audio[id], id: id, play: false, playing: false });
      // }
      // player.paused ? player.play() : player.pause()
    }
  };

  // const vplayer = useVideoPlayer('', player => {
  //   player.loop = true;
  //   player.play();
  // });

  // const { isPlaying } = useEvent(vplayer, 'playingChange', { isPlaying: player.playing });

  let param = route.params;
  let id = get_id(param);

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

  const handleSaveToProfile = () => {
    Toast.show({ type: "success", text1: "Image saved to profile!" });
    setSelectedImage(null);
  };

  return (
    <ScrollView>
      <Alert_System />
      <View style={globalStyles.dashboardContainer}>
        <View style={{ gap: 8, width: "100%" }}>
          {mgs.data &&
            mgs.data.map((message, index) => {
              switch (message.record_type) {
                case "text":
                  return (
                    <View key={index} style={[styles.messageText]}>
                      <Text
                        style={
                          message.context != "medical_practitioner" && {
                            color: "blue",
                          }
                        }>
                        {message.timestamp}
                      </Text>
                      <Text key={index}>{message.content}</Text>
                    </View>
                  );
                case "image":
                  return (
                    <View key={index}>
                      <Text
                        style={
                          message.context != "medical_practitioner" && {
                            color: "blue",
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
                    <View key={index}>
                      <Text
                        style={
                          message.context != "medical_practitioner" && {
                            color: "blue",
                          }
                        }>
                        {message.timestamp}
                      </Text>
                      <Text>{video[message.id] ? "" : "Loading Video"}</Text>
                      <View style={styles_.container}>
                        <Video
                          source={{
                            uri: video[message.id] ? video[message.id] : "",
                          }}
                          style={styles_.videoPlayer}
                          controls={true} // Show play/pause controls
                          resizeMode="cover"
                          paused={true}
                        />
                      </View>
                      {/* <VideoView  player={videoPlayer[message.id]} allowsFullscreen allowsPictureInPicture /> */}
                      {/* <View >
                      
                    </View> */}
                    </View>
                  );
                case "audio":
                  return (
                    <View key={index}>
                      <Text
                        style={
                          message.context != "medical_practitioner" && {
                            color: "blue",
                          }
                        }>
                        {message.timestamp}
                      </Text>

                      <TouchableOpacity
                        key={index}
                        onPress={() => handleAudio(message.id)}>
                        <Text>
                          {audio[message.id] &&
                          audioPlayer.id == message.id &&
                          audioPlayer.playing
                            ? "Pause"
                            : audio[message.id]
                            ? "Play Audio"
                            : "Loading Audio"}
                        </Text>
                      </TouchableOpacity>
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
                {/* <TouchableOpacity
                  style={formStyles.submitButton}
                  onPress={handleSaveToProfile}>
                  <Text style={formStyles.submitText}>Save to Profile</Text>
                </TouchableOpacity> */}
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
