import { StatusBar } from "expo-status-bar";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { config } from "./config/gluestack-ui.config";

import { AuthContextProvider } from "@contexts/AuthContext";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <GestureHandlerRootView>
      <GluestackUIProvider config={config}>
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
        <StatusBar style="dark" />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
