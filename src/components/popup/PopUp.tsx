import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Modal from 'react-native-modal';
import { SoundButtonProp } from '../../utills/types';
import { BUTTON_COLORS } from '../../utills/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from '@react-native-material/core';
import { styles } from './styles';

type Props = {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  isPopUp: boolean;
  soundButtonProps: SoundButtonProp;
  setSounds: React.Dispatch<React.SetStateAction<SoundButtonProp[]>>;
};
const TITLE_ERROR_MESSAGE = 'Title should be 1-10 chars long';
const HEADLINE_TEXT = 'BUTTON OPTIONS';
const CHANGE_COLOR_TEXT = "Change Your Button's Color";
const CHANGE_TITLE_TEXT = "Change Your Button's Title";

export default function PopUp({
  setIsPopUp,
  isPopUp,
  soundButtonProps,
  setSounds,
}: Props) {
  const { title, pressedColor, soundId } = soundButtonProps;
  const [selectedButtonColor, setSelectedButtonColor] = useState(pressedColor);
  const [modifiedButtonTitle, setModifiedButtonTitle] = useState(title);
  const [errorText, setErrorText] = useState('');

  const closePopUp = () => {
    setIsPopUp(false);
  };

  const colorPressHandler = (color: string) => {
    setSelectedButtonColor(color);
  };

  const displayColorOptions = () => {
    return BUTTON_COLORS.map((color) => {
      const isSelectedButton = color === selectedButtonColor;
      return (
        <TouchableOpacity
          key={color}
          style={{
            ...styles.button,
            backgroundColor: color,
            borderColor: isSelectedButton ? '#ffd700' : 'transparent',
          }}
          activeOpacity={0.65}
          onPress={() => {
            colorPressHandler(color);
          }}
        >
          {isSelectedButton && (
            <FontAwesome name="check" style={styles.selectedButtonIcon} />
          )}
          <Text style={styles.buttonText}>{color}</Text>
        </TouchableOpacity>
      );
    });
  };

  const onChangeTitle = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const modifiedText = event.nativeEvent.text;
    if (modifiedText.length <= 10) {
      setModifiedButtonTitle(modifiedText);
    }
  };

  const validateButtonTitle = () => {
    const isModifiedTitleValid =
      modifiedButtonTitle.length > 1 && modifiedButtonTitle.length <= 10;

    if (!isModifiedTitleValid) {
      setErrorText(TITLE_ERROR_MESSAGE);
      return false;
    }

    return true;
  };

  const applyHandler = () => {
    const isTitleValid = validateButtonTitle();

    if (!isTitleValid) {
      return;
    }

    setSounds((prev) => {
      const updatedSounds = prev.map((sound) => {
        if (sound.soundId === soundId) {
          sound.pressedColor = selectedButtonColor;
          sound.title = modifiedButtonTitle;
        }
        return sound;
      });
      return updatedSounds;
    });
    closePopUp();
  };

  const FOOTER_BUTTONS = [
    { color: '#D7D7D7', text: 'CANCEL', fn: closePopUp },
    { color: '#5391FD', text: 'APPLY', fn: applyHandler },
  ];

  const displayFooterButtons = FOOTER_BUTTONS.map(({ text, color, fn }) => {
    return (
      <TouchableOpacity
        key={text}
        onPress={fn}
        activeOpacity={0.65}
        style={{ ...styles.button, backgroundColor: color }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  });

  const isError = !!errorText;
  const displayErrorMessage = isError && (
    <Text style={styles.errorText}>{errorText}</Text>
  );

  return (
    <View>
      <Modal isVisible={isPopUp} onBackdropPress={closePopUp}>
        <View style={styles.modalView}>
          <Text style={styles.headline}>{HEADLINE_TEXT}</Text>

          <Text style={styles.subHeadLine}>{CHANGE_COLOR_TEXT}</Text>
          <View style={styles.buttonsContainer}>{displayColorOptions()}</View>

          <Text style={styles.subHeadLine}>{CHANGE_TITLE_TEXT}</Text>
          <TextInput
            maxLength={10}
            value={modifiedButtonTitle}
            style={styles.input}
            onChange={onChangeTitle}
          />
          {displayErrorMessage}

          <View style={styles.submitView}>{displayFooterButtons}</View>
        </View>
      </Modal>
    </View>
  );
}
