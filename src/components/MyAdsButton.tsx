import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Tag, ArrowRight } from "phosphor-react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export function MyAdsButton() {
  const { tokens } = gluestackUIConfig;

  return (
    <Pressable
      onPress={() => console.log("asd")}
      bgColor="$blueLightAlpha"
      p="$4"
      rounded={"$lg"}
      $active-bg="$blueLightAlpha2"
      mt={"$4"}
    >
      <HStack alignItems="center">
        <Tag color={tokens.colors.blue} />
        <VStack ml={"$4"} flex={1}>
          <Heading>4</Heading>
          <Text>anúncios ativos</Text>
        </VStack>

        <Text color="$blue" mr={"$4"} fontFamily="$heading">
          Meus anúncios
        </Text>
        <ArrowRight color={tokens.colors.blue} />
      </HStack>
    </Pressable>
  );
}
