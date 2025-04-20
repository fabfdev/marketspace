import { ComponentProps } from "react";
import { Button, useToken } from "@gluestack-ui/themed";

import { PencilSimple } from "phosphor-react-native";

type Props = ComponentProps<typeof Button>;

export function ButtonEdit({ ...rest }: Props) {
  const gray6 = useToken("colors", "gray6");
  return (
    <Button rounded={"$full"} h={"$10"} w={"$10"} {...rest}>
      <PencilSimple color={gray6} size={16} />
    </Button>
  );
}
