import React from 'react';
import { useQuery } from 'react-query';
import { fetchSoundAudio } from '../api-service/getRequests';

function useGetSoundAudio(soundData: string) {
  return useQuery(['audio', soundData], () => fetchSoundAudio(soundData));
}

export default useGetSoundAudio;
