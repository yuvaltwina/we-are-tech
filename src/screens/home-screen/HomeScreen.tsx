import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SoundButton from '../../components/sound-button/SoundButton';
import { FetchedSound, SoundButtonProp } from '../../utills/types';
import { BUTTON_COLORS } from '../../utills/constants';
import { useToast } from 'react-native-toast-notifications';
import useGetSounds from '../../hooks/useGetSounds';
import { styles } from './styles';

const SOUND_FETCH_ERROR_TEXT = 'Couldnt fetch sounds';

export default function HomeScreen() {
  const [sounds, setSounds] = useState<SoundButtonProp[]>([]);

  const toast = useToast();
  const { data, isError } = useGetSounds();

  useEffect(() => {
    const fetchedSoundsArray = data?.data;

    if (!fetchedSoundsArray) {
      if (isError) {
        toast.show(SOUND_FETCH_ERROR_TEXT, { type: 'danger' });
      }
      return;
    }
    const sounds = fetchedSoundsArray.slice(1, 9);

    const soundsWithColors = sounds.map(
      ({ soundId, title, soundData }: FetchedSound, index: number) => {
        return {
          soundId,
          title,
          soundData,
          pressedColor: BUTTON_COLORS[index],
        };
      }
    );

    setSounds(soundsWithColors);
  }, [data]);

  const displayButtons = () => {
    if (!sounds.length) {
      return null;
    }

    return sounds.map((soundButtonProps: SoundButtonProp) => {
      const { soundId } = soundButtonProps;
      return (
        <SoundButton
          key={soundId}
          soundButtonProps={soundButtonProps}
          setSounds={setSounds}
        />
      );
    });
  };

  return <View style={styles.container}>{displayButtons()}</View>;
}
