import { useEffect, useState } from 'react';
import { View, StyleSheet, Button,Text } from 'react-native';
import { Audio } from 'expo-av';
import { formatTime } from '@/src/integrations/axios_store'


export default function AudioScreen({ audioSource }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  audioSource = 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 

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

 
const [progress, setProgress] = useState({ position: '0:00', duration: '0:00', progress: 0 });

useEffect(() => {
  let interval;
  if (sound && sound._loaded) {
    interval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        
        setProgress({
          position: formatTime(status.positionMillis),
          duration: formatTime(status.durationMillis),
          progress: status.positionMillis / status.durationMillis
        });
      }
    }, 500);
  }
  return () => clearInterval(interval);
}, [sound]);
  
  

  const ProgressBar = ({ progress }) => (
  <View>
  <View>
      <Text style={[{ marginRight: 20 }]}>
        {progress.position} / {progress.duration}
      </Text>
      </View>
      <View
        style={{ flex: 1 }}
        // onStartShouldSetResponder={() => true}
        onResponderRelease={(event) => {
        const { locationX } = event.nativeEvent;
        const progressBarWidth = event.target.measure((x, y, width) => width);
        const clickedPercentage = locationX / progressBarWidth;
        console.log('Clicked Percentage:', clickedPercentage * 100);
        }}
      />
  <View style={styles.progressBarContainer}>
    {/* <Text>{Math.round(progress.progress * 100)}%</Text> */}
        <View style={[styles.progressBar, { width: `${progress.progress * 100}%`, backgroundColor: 'green' }]}
          onStartShouldSetResponder={() => true}
        />
      
      </View>
    </View>
  );
  
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
  if (sound) {
    const status = await sound.getStatusAsync();
    if (status.isPlaying) {
    console.log('Pausing Sound');
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
    console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    }
  } else {
    console.log('Loading and Playing Sound');
    const { sound: newSound } = await Audio.Sound.createAsync(
    { uri: audioSource }
    );
    setSound(newSound);
    await newSound.playAsync();
  }
  // console.log('Loading Sound from playSound');


    // const { sound } = await Audio.Sound.createAsync(
    //   { uri: audioSource },
    //   // { shouldPlay: true }
    //   // 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 
    // );
    //  setSound(sound);
      
    // console.log(sound)

    // console.log('Playing Sound');
    // await sound.playAsync();
  }



  async function preLoad() {
    // console.log('Loading Sound from playSound');
  const { sound } = await Audio.Sound.createAsync( 
        {uri: audioSource}
        // 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 
    );

    setSound(sound);

    await sound.playAsync()
    await sound.stopAsync()
    
    
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      setProgress({
        position: formatTime(status.positionMillis),
        duration: formatTime(status.durationMillis),
        progress: status.positionMillis / status.durationMillis
      });
    }

    // console.log('Playing Sound');
    // await sound.playAsync();


  }
  
  if (!sound) {
     preLoad();
    // console.log('sound in',sound)
  }
  
 
  // console.log('sound out',sound)
      
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
           sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);
    
  useEffect(() => {
  }, [isPlaying]);

  return (
      <View style={styles.container}>
          {/* <Button title="Play Sound" onPress={playSound} /> */}
          {/* sound != undefined && sound._loaded */}
         
      {sound && sound._loaded ?
        <>
        <ProgressBar progress={progress} />
          <Button title={isPlaying?'Pause':'Play'} onPress={playSound} />
          </>
        : <Text>Audio Loading...</Text>} 
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
  progressBarContainer: {
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden',
    },
  progressBar: {
      // flex: 1,
      height: '100%',
      borderRadius: 10,
    },
});
