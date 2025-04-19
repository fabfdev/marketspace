import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
  return (
    <GluestackInput h={"$12"} borderWidth={"$0"} borderRadius={"$md"} mb={"$4"}>
      <InputField
        bg="$gray7"
        placeholderTextColor="$gray4"
        color="$gray1"
        fontFamily="$body"
        px={"$4"}
        {...rest}
      />
    </GluestackInput>
  );
}
