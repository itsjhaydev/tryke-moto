import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

function AuthRedirectWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'passenger') {
        router.replace('/homepage/(tabs)');
      } else if (user.role === 'driver') {
        router.replace('/drivers-page/(tabs)');
      }
    }
  }, [user, loading]);

  return <>{children}</>;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <AuthRedirectWrapper>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="homepage/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="homepage/requestride" options={{ headerShown: false }} />
            <Stack.Screen name="drivers-page/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
            <Stack.Screen name="auth/otp-verification" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signup-driver" options={{ headerShown: false }} />
            <Stack.Screen name="auth/register-toda" options={{ headerShown: false }} />
            <Stack.Screen name="homepage/pickupDropoff" options={{ headerShown: false }} />
            <Stack.Screen name="homepage/select-payment" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <Toast />
        </AuthRedirectWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}
