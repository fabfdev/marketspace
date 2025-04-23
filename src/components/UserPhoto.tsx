import { ComponentProps } from "react";

import { Image } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof Image> & {
    isUserAd?: boolean;
};

export function UserPhoto({ isUserAd = false, ...rest }: Props) {
  return (
    <Image
      rounded={"$full"}
      borderWidth={"$2"}
      borderColor={isUserAd ? "$gray7" : "$blueLight"}
      {...rest}
    />
  );
}
