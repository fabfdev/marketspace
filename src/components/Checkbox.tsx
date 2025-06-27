import {
  Checkbox as GluestackCheckbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Check } from "phosphor-react-native";

type Props = {
  value: string;
  title: string;
};

export function Checkbox({ value, title }: Props) {
  const { tokens } = gluestackUIConfig;

  return (
    <GluestackCheckbox value={value} aria-label={value} mt={"$2"}>
      <CheckboxIndicator
        sx={{
          ":checked": {
            bgColor: tokens.colors.blueLight,
            borderColor: tokens.colors.blueLight,
          },
          borderColor: tokens.colors.gray5,
        }}
      >
        <CheckboxIcon as={Check} color="$white" />
      </CheckboxIndicator>
      <CheckboxLabel ml={"$3"}>{title}</CheckboxLabel>
    </GluestackCheckbox>
  );
}
