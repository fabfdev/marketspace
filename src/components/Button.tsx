import { ComponentProps } from "react";
import { Center, Button as GluestackButton, Spinner, Text } from "@gluestack-ui/themed";

type ButtonVariantProps = "solid" | "link" | "outline";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: ButtonVariantProps;
  isLoading?: boolean;
  isAuto?: boolean;
  isFlex?: boolean;
};

export function Button({
  title,
  variant = "solid",
  isLoading = false,
  isAuto = false,
  isFlex = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      sx={isFlex ? { flex: 1 } : { width: isAuto ? "auto" : "$full" }}
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
      rounded={"$lg"}
      disabled={isLoading}
    >
      {!isLoading ? (
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
      ) : (
        <Center>
          <Spinner color={"$blueLight"}/>
        </Center>
      )}
    </GluestackButton>
  );
}
