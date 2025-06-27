import { ComponentProps } from "react";
import {
  Input as GluestackInput,
  InputField,
  Text,
} from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string;
};

export function Input({ errorMessage, ...rest }: Props) {
  return (
    <>
      <GluestackInput
        h={"$12"}
        borderWidth={"$0"}
        borderRadius={"$md"}
        mb={!!errorMessage ? "$0" : "$4"}
      >
        <InputField
          bg="$gray7"
          placeholderTextColor="$gray4"
          color="$gray1"
          fontFamily="$body"
          px={"$4"}
          {...rest}
        />
      </GluestackInput>
      {errorMessage && (
        <Text mb={"$4"} mt={"$2"} color="$red500" w={"$full"} fontSize={"$sm"}>
          {errorMessage}
        </Text>
      )}
    </>
  );
}
