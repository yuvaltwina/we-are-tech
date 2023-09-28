import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from 'react-native-toast-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/screens/home-screen/HomeScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <View>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <GestureHandlerRootView>
            <HomeScreen />
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </ToastProvider>
      </QueryClientProvider>
    </View>
  );
}
