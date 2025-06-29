import { ComponentProps } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed";

import { MagnifyingGlass, LineVertical, Sliders } from "phosphor-react-native";

type Props = ComponentProps<typeof Input> & {
  onChangeText?: (value: string) => void;
  value?: string;
  handleFilter: () => void;
};

export function InputSearch({
  onChangeText,
  value,
  handleFilter,
  ...rest
}: Props) {
  return (
    <Input
      h={"$12"}
      borderWidth={"$0"}
      borderRadius={"$md"}
      bg="$gray7"
      {...rest}
    >
      <InputField
        placeholder="Buscar anúncio"
        placeholderTextColor={"$gray4"}
        color="$gray1"
        fontFamily="$body"
        onChangeText={onChangeText}
        value={value}
      />
      <InputSlot>
        <InputIcon as={MagnifyingGlass} color="$gray2" size="lg" />
      </InputSlot>
      <InputSlot px="$2">
        <InputIcon as={LineVertical} />
      </InputSlot>
      <InputSlot pr="$3" onPress={handleFilter}>
        <InputIcon as={Sliders} color="$gray2" size="lg" />
      </InputSlot>
    </Input>
  );
}
