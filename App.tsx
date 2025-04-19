import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import { Loading } from "@components/Loading";
import { SignIn } from "@screens/SignIn";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <GluestackUIProvider config={config}>
      <Center flex={1}>
        {fontsLoaded ? (
          <SignIn />
        ) : (
          <Loading />
        )}
        <StatusBar style="dark" />
      </Center>
    </GluestackUIProvider>
  );
}
