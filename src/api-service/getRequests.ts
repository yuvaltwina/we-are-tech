import axios from 'axios';
import { API_URL } from '../utills/constants';
import { Audio } from 'expo-av';

export const fetchSounds = async () => {
  const serverResponse = await axios.get(API_URL);
  return serverResponse;
};

export const fetchSoundAudio = async (soundData: string) => {
  const { sound } = await Audio.Sound.createAsync(
    { uri: soundData },
    { shouldPlay: false }
  );
  return sound;
};
