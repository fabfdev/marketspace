import { Heading, HStack, Pressable } from "@gluestack-ui/themed";
import { ArrowLeft } from "phosphor-react-native";

type RouteParamProps = {
  title: string;
  handleBack?: () => void;
}

export function Toolbar({ title, handleBack = () => {} }: RouteParamProps) {
  return (
    <HStack pt={"$16"} alignItems="center" gap={"$4"}>
      <Pressable pl={"$8"} onPress={handleBack}>
        <ArrowLeft />
      </Pressable>
      <Heading>
        {title}
      </Heading>
    </HStack>
  );
}
