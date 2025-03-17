import { useEffect, useState } from 'react';
import { View, StyleSheet, Button,  TouchableOpacity } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';


export default function AudioScreen({ audioSource }) {
    
    const player = useAudioPlayer(audioSource);
    playerStatus = useAudioPlayerStatus(player)
    

    const handleAudio = () => {
        if (playerStatus.timeControlStatus =='paused') {
            player.play();  
        } else {
            player.pause();
        }
    };

    return (
        <View style={styles.container}>
            {/* <Button title= 'Back' onPress={handleBackward} /> */}
            <Button title={playerStatus.timeControlStatus =='paused' ? 'Play' : 'Pause'} onPress={handleAudio} />
            {/* <Button title= 'Forward' onPress={handleFastForward} /> */}
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