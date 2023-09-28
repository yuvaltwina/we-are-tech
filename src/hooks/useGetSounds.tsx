import React from 'react';
import { useQuery } from 'react-query';
import { fetchSounds } from '../api-service/getRequests';

function useGetSounds() {
  return useQuery(['sounds'], fetchSounds);
}

export default useGetSounds;
