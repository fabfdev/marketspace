import { ComponentProps } from "react";
import { Box, Image, Pressable } from "@gluestack-ui/themed";
import { X } from "phosphor-react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { ImagesDTO } from "@dtos/ImagesDTO";

type Props = ComponentProps<typeof Box> & {
  onDelete: () => void;
  item: ImagesDTO;
};

export function ImageAdCreation({ item, onDelete, ...rest }: Props) {
  const { tokens } = gluestackUIConfig;
  return (
    <Box position="relative" {...rest}>
      <Image
        source={{ uri: item.uri }}
        w={"$24"}
        h={"$24"}
        alt="Imagem de anúncio"
        borderRadius={6}
      />
      <Pressable
        position="absolute"
        alignSelf="flex-end"
        bgColor="$gray2"
        rounded={"$full"}
        p={"$1"}
        top={4}
        right={4}
        onPress={onDelete}
      >
        <X size={16} color={tokens.colors.gray7} />
      </Pressable>
    </Box>
  );
}
