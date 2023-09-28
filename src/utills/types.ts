export type FetchedSound = {
  soundId: string;
  title: string;
  soundData: string;
};

export type SoundButtonProp = FetchedSound & { pressedColor: string };
