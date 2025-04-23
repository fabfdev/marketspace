import {
  Image,
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import { UserPhoto } from "./UserPhoto";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function AdItem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenDetails() {
    navigator.navigate("adDetails");
  }

  return (
    <Pressable flex={1} mb={"$8"} onPress={handleOpenDetails}>
      <Box position="relative">
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/exposi%C3%A7%C3%A3o-de-sapatos-esportivos-nike-na-prateleira-da-loja-novi-micmichigan-oct-%C3%A9-uma-empresa-americana-que-projeta-marketing-259470358.jpg",
          }}
          alt="Cana"
          w={"$full"}
          resizeMode="cover"
          h={"$24"}
          rounded={"$md"}
        />

        <UserPhoto
          source={{
            uri: "https://pbs.twimg.com/media/GDLS7FPXQAA6gR_.jpg",
          }}
          position="absolute"
          alt="Foto user"
          w={"$8"}
          h={"$8"}
          top={5}
          left={5}
          isUserAd
        />

        {/* $blue */}
        <Text
          position="absolute"
          alignSelf="flex-end"
          bgColor="$gray2"
          color="$white"
          fontFamily="$heading"
          fontSize={"$xs"}
          py={"$1"}
          px={"$2"}
          rounded={"$full"}
          top={5}
          right={5}
        >
          USADO
        </Text>
      </Box>

      <Text mt={"$2"}>Tênis Nike</Text>
      <HStack alignItems="baseline">
        <Text fontFamily="$heading">R$</Text>
        <Heading ml={"$1"}>120,00</Heading>
      </HStack>
    </Pressable>
  );
}
