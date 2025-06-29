import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Tag, ArrowRight } from "phosphor-react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Pressable> & {
  myActiveAdsSize: number;
};

export function MyAdsButton({ myActiveAdsSize = 0, ...rest }: Props) {
  const { tokens } = gluestackUIConfig;

  return (
    <Pressable
      bgColor="$blueLightAlpha"
      p="$4"
      rounded={"$lg"}
      $active-bg="$blueLightAlpha2"
      mt={"$4"}
      {...rest}
    >
      <HStack alignItems="center">
        <Tag color={tokens.colors.blue} />
        <VStack ml={"$4"} flex={1}>
          <Heading>{myActiveAdsSize}</Heading>
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
