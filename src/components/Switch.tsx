import { ComponentProps } from "react";
import { Switch as GluestackSwitch } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = ComponentProps<typeof GluestackSwitch>;

export function Switch({ ...rest }: Props) {
  const { tokens } = gluestackUIConfig;
  return (
    <GluestackSwitch
      trackColor={{
        false: tokens.colors.gray5,
        true: tokens.colors.blueLight,
      }}
      aria-live="polite"
      {...rest}
    />
  );
}
