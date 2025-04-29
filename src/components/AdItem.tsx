import {
  Image,
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
} from "@gluestack-ui/themed";

import { UserPhoto } from "./UserPhoto";

type Props = {
  onClick?: () => void;
  isMine?: boolean;
  isDisabled?: boolean;
};

export function AdItem({ onClick, isMine = false, isDisabled = false }: Props) {
  return (
    <Pressable flex={1} mb={"$8"} onPress={onClick}>
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

        {!isMine && (
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
        )}

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

        {isDisabled && (
          <Box
            position="absolute"
            bgColor="$black50alpha"
            w={"$full"}
            h={"$24"}
            rounded={"$md"}
            justifyContent="flex-end"
          >
            <Text
              color={"$gray7"}
              fontSize={"$sm"}
              fontFamily="$heading"
              mx={"$1"}
              mb={"$2"}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        )}
      </Box>

      <Text mt={"$2"} color={!isDisabled ? "$gray2" : "$gray4"}>Tênis Nike</Text>
      <HStack alignItems="baseline">
        <Text fontFamily="$heading" color={!isDisabled ? "$gray2" : "$gray4"}>R$</Text>
        <Heading ml={"$1"} color={!isDisabled ? "$gray2" : "$gray4"}>120,00</Heading>
      </HStack>
    </Pressable>
  );
}
