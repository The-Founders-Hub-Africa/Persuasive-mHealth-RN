import * as FileSystem from 'expo-file-system';
import { axiosGetMediaFile } from './axios_store';


  // Save image to file system
const saveImageToFileSystem = async (blob, filename) => {
      const base64Data = await blobToBase64(blob);
      
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
    };

const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
};
     



export const getMediaFiles = async (data, video_state, set_video,
                                audio_state, set_audio,
                                image_state, set_image,
                                token) => {
                                                            
    let setters = {
        video: [set_video, video_state],
        audio: [set_audio, audio_state],
        image: [set_image, image_state]
    }

    data.forEach(async message => {
        if(message.record_type !== 'text'){
            const response = await axiosGetMediaFile(message.content,token)
            if (response.success) {
                const blob = new Blob([response.data], { type: response.data.type, lastModified: Date.now() });
                const base64Data = await blobToBase64(blob);

                setters[message.record_type][0]({
                    ...setters[message.record_type][1],
                    [message.id]: base64Data
                })


            }

        }
    });
}
