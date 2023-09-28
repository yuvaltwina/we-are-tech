import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SoundButtonProp } from '../../utills/types';
import PopUp from '../popup/PopUp';
import { useToast } from 'react-native-toast-notifications';
import useGetSoundAudio from '../../hooks/useGetSoundAudio';
import {
  TapGestureHandler,
  State,
  GestureHandlerGestureEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { styles } from './styles';

type Props = {
  soundButtonProps: SoundButtonProp;
  setSounds: React.Dispatch<React.SetStateAction<SoundButtonProp[]>>;
};
const BUTTON_DEFAULT_COLOR = '#1d1d20ff';
const DOWNLOAD_SOUND_ERROR_TEXT = 'Couldnt download sound';
const PLAY_SOUND_ERROR_TEXT = 'Couldnt download sound';

export default function SoundButton({ soundButtonProps, setSounds }: Props) {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isPressed, setisPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { soundData, title, pressedColor } = soundButtonProps;
  const { data: soundObject, isError } = useGetSoundAudio(soundData);
  const buttonStyle = {
    ...styles.button,
    backgroundColor: isPressed ? pressedColor : BUTTON_DEFAULT_COLOR,
  };

  const openPopUp = () => setIsPopUp(true);

  const playAudio = async () => {
    if (!soundObject) {
      if (isError) {
        toast.show(DOWNLOAD_SOUND_ERROR_TEXT, { type: 'danger' });
      }
      return;
    }
    try {
      await soundObject.playAsync();
      await soundObject.setPositionAsync(0);
    } catch (err) {
      toast.show(PLAY_SOUND_ERROR_TEXT, { type: 'danger' });
    }
  };

  const onPressIn = () => {
    setIsLoading(true);
    setisPressed(true);
    playAudio();
    setIsLoading(false);
  };

  const onPressOut = () => {
    setisPressed(false);
  };

  const handleTap = (e: GestureHandlerGestureEvent) => {
    const tapAction = e.nativeEvent.state;
    const longPress = 1;

    if (tapAction === State.BEGAN) {
      onPressIn();
    } else if (tapAction === longPress) {
      onPressOut();
      openPopUp();
    } else if (tapAction === State.CANCELLED || tapAction === State.END) {
      onPressOut();
    }
  };

  const handleSecondTap = () => {
    playAudio();
  };

  const displayTextOrLoader = isLoading ? (
    <View style={styles.text}>
      <ActivityIndicator size="small" color="#0000ff" style={{ height: 21 }} />
    </View>
  ) : (
    <Text style={styles.text}>{title}</Text>
  );

  return (
    <View>
      <TapGestureHandler onHandlerStateChange={handleTap} maxDurationMs={1100}>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            disabled={!isPressed}
            onPress={handleSecondTap}
          >
            <View style={buttonStyle}>{displayTextOrLoader}</View>
          </TouchableOpacity>
        </View>
      </TapGestureHandler>

      <PopUp
        setIsPopUp={setIsPopUp}
        isPopUp={isPopUp}
        soundButtonProps={soundButtonProps}
        setSounds={setSounds}
      />
    </View>
  );
}
