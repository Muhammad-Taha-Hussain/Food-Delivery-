import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import CartProvider from "@/providers/CartProvider";
import { SplashScreen, Stack } from "expo-router";
import QueryProvider from "@/providers/QueryProvider";
import React, { useEffect } from "react";
import AuthProvider from "@/providers/AuthProvider";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(user)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            </Stack>
          </CartProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
