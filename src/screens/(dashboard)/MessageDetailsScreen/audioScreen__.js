import { useEffect, useState } from 'react';
import { View, StyleSheet, Button,Text } from 'react-native';
import { Audio } from 'expo-av';


export default function AudioScreen({ audioSource }) {
  const [sound, setSound] = useState();

  

    // useEffect(() => {

    //      const loadSound = async () => {
    //     console.log('Loading Sound');
    //     const { sound_ } = await Audio.Sound.createAsync(
    //         'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'   
    //     );
    //     console.log('Sound Loaded');
    //     console.log('sound',sound_) 
    //     setSound(sound_);
    //     }
    //     loadSound();
    //   }, []);

 

//   async function playSound() {
//     if (sound) {
//       try {
//         console.log('Playing Sound');
//         await sound.playAsync();
//       } catch (error) {
//         console.error('Error playing sound:', error);
//       }
//     } else {
//       console.warn('Sound is not loaded yet.');
//     }
//   }


  async function playSound() {
  
  // console.log('Loading Sound from playSound');


    const { sound } = await Audio.Sound.createAsync(
      { uri: audioSource },
      { shouldPlay: true }
      // 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 
    );
    setSound(sound);
      
    // console.log(sound)

    // console.log('Playing Sound');
    await sound.playAsync();
  }

  async function preLoad() {
    // console.log('Loading Sound from playSound');
  const { sound } = await Audio.Sound.createAsync( 
        {uri: audioSource}
        // 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 
    );
    setSound(sound);

    // console.log('Playing Sound');
    // await sound.playAsync();
  }
  if (!sound) {
     preLoad();
    // console.log('sound in',sound)
  }
 
  // console.log('sound out',sound)
      
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //          sound.unloadAsync(); 
  //       }
  //     : undefined;
  // }, [sound]);
    
    

  return (
      <View style={styles.container}>
          {/* <Button title="Play Sound" onPress={playSound} /> */}
          {/* sound != undefined && sound._loaded */}
         
          {sound && sound._loaded  ? <Button title="Play Sound" onPress={playSound} />:<Text>Audio Loading...</Text>} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
