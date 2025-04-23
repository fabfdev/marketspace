import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, VStack } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ArrowLeft } from "phosphor-react-native";

export function AdDetails() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleBack() {
    navigator.goBack();
  }

  return (
    <VStack bgColor="$gray5" flex={1} pt={"$16"} px={"$8"}>
      <Pressable onPress={handleBack}>
        <ArrowLeft />
      </Pressable>
    </VStack>
  );
}
