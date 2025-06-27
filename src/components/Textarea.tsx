import { ComponentProps } from "react";
import { Textarea as GluestackTextarea, TextareaInput } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof TextareaInput>;

export function Textarea({ ...rest }: Props) {
  return (
    <GluestackTextarea borderWidth={"$0"} mb={"$4"}>
      <TextareaInput
        bg="$gray7"
        placeholderTextColor="$gray4"
        color="$gray1"
        fontFamily="$body"
        px={"$4"}
        {...rest}
        borderRadius={6}
      />
    </GluestackTextarea>
  );
}
