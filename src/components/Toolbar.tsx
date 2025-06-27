import { Heading, HStack, Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "phosphor-react-native";
import { ComponentProps } from "react";

type RouteParamProps = ComponentProps<typeof HStack> & {
  title: string;
}

export function Toolbar({ title }: RouteParamProps) {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleBack() {
    navigator.goBack();
  }

  return (
    <HStack pt={"$16"} alignItems="center">
      <Pressable pl={"$8"} onPress={handleBack}>
        <ArrowLeft />
      </Pressable>
      <Heading position="absolute" w={"$full"} alignSelf="flex-end" textAlign="center">
        {title}
      </Heading>
    </HStack>
  );
}
