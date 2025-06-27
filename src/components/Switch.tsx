import { Switch as GluestackSwitch } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export function Switch() {
  const { tokens } = gluestackUIConfig;
  return (
    <GluestackSwitch
      trackColor={{
        false: tokens.colors.gray5,
        true: tokens.colors.blueLight,
      }}
      aria-live="polite"
    />
  );
}
