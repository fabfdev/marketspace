import { ComponentProps } from "react";
import { Button as GluestackButton, Text } from "@gluestack-ui/themed";

type ButtonVariantProps = "solid" | "link" | "outline";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: ButtonVariantProps;
  isLoading?: boolean;
};

export function Button({
  title,
  variant = "solid",
  isLoading,
  ...rest
}: Props) {
  return (
    <GluestackButton
      w={"$full"}
      h={"$12"}
      bg={
        variant === "solid"
          ? "$blueLight"
          : variant === "link"
          ? "$gray1"
          : "$gray5"
      }
      $active-bg={
        variant === "solid" ? "$blue" : variant === "link" ? "$gray2" : "$gray4"
      }
      {...rest}
    >
      <Text
        color={
          variant === "solid"
            ? "$gray7"
            : variant === "link"
            ? "$gray7"
            : "$gray2"
        }
        fontFamily="$heading"
        fontSize={"$sm"}
      >
        {title}
      </Text>
    </GluestackButton>
  );
}
