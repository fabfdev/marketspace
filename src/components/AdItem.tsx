import {
  Image,
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
} from "@gluestack-ui/themed";

import { UserPhoto } from "./UserPhoto";

import { ProductsDTO } from "@dtos/ProductsDTO";
import { useInputFormatter } from "@hooks/useInputFormatter";
import { api } from "@services/api";

type Props = {
  onClick?: () => void;
  item: ProductsDTO;
  isMine?: boolean;
};

export function AdItem({ onClick, item, isMine = false }: Props) {
  const { formatToPrice } = useInputFormatter();

  const isActive = () => {
    return item.is_active === undefined || item.is_active;
  };

  return (
    <Pressable flex={1} mb={"$8"} onPress={onClick}>
      <Box position="relative">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${item.product_images[0].path}`,
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
              uri: `${api.defaults.baseURL}/images/${item.user.avatar}`,
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

        <Text
          position="absolute"
          alignSelf="flex-end"
          bgColor={item.is_new ? "$blue" : "$gray2"}
          color="$white"
          fontFamily="$heading"
          fontSize={"$xs"}
          py={"$1"}
          px={"$2"}
          rounded={"$full"}
          top={5}
          right={5}
        >
          {item.is_new ? "NOVO" : "USADO"}
        </Text>

        {!isActive() && (
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

      <Text mt={"$2"} color={isActive() ? "$gray2" : "$gray4"}>
        {item.name}
      </Text>
      <HStack alignItems="baseline">
        <Text
          fontFamily="$heading"
          color={isActive() ? "$gray2" : "$gray4"}
        >
          R$
        </Text>
        <Heading ml={"$1"} color={isActive() ? "$gray2" : "$gray4"}>
          {formatToPrice(String(item.price))}
        </Heading>
      </HStack>
    </Pressable>
  );
}
