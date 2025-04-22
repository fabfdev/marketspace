import { StatusBar } from "expo-status-bar";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? <Routes /> : <Loading />}
      <StatusBar style="dark" />
    </GluestackUIProvider>
  );
}
