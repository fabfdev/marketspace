import React, { useCallback, useState } from "react";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Heading,
  HStack,
  Switch,
  VStack,
} from "@gluestack-ui/themed";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { X, Check } from "phosphor-react-native";

import XCircle from "@assets/x_circle.svg";

import { Button } from "@components/Button";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheet>;
};

export function SheetFilter({ bottomSheetRef }: Props) {
  const { tokens } = gluestackUIConfig;
  const [isUsedChecked, setIsUsedChecked] = useState(true);
  const [isNewChecked, setIsNewChecked] = useState(true);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6} // Adjust for how dark you want the background
      />
    ),
    []
  );

  function buildCheckbox({ value, title }: { value: string; title: string }) {
    return (
      <Checkbox value={value} aria-label={value} mt={"$2"}>
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
      </Checkbox>
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
    >
      <BottomSheetView>
        <VStack pb={"$8"} px={"$8"}>
          <HStack alignItems="center">
            <Heading flex={1} fontSize={"$xl"}>
              Filtrar anúncios
            </Heading>
            <X color={tokens.colors.gray4} />
          </HStack>

          <Heading fontSize={"$sm"} color="$gray2" mt={"$6"}>
            Condição
          </Heading>

          <HStack gap={8}>
            <Checkbox
              value="usado"
              bgColor="$gray5"
              $checked-bgColor="$blueLight"
              accessibilityLabel="Filtrar por produtos usados"
              defaultIsChecked
              px={"$3"}
              py={"$2"}
              rounded={"$full"}
              onChange={(checked) => setIsUsedChecked(checked)}
              aria-label="usado"
            >
              <CheckboxLabel
                $checked-color="$white"
                fontSize={"$xs"}
                fontFamily="$heading"
              >
                USADO
              </CheckboxLabel>
              {isUsedChecked && <XCircle style={{ marginLeft: 6 }} />}
            </Checkbox>

            <Checkbox
              value="novo"
              bgColor="$gray5"
              $checked-bgColor="$blueLight"
              accessibilityLabel="Filtrar por produtos novos"
              defaultIsChecked
              px={"$3"}
              py={"$2"}
              rounded={"$full"}
              onChange={(checked) => setIsNewChecked(checked)}
              aria-label="novo"
            >
              <CheckboxLabel
                $checked-color="$white"
                fontSize={"$xs"}
                fontFamily="$heading"
              >
                NOVO
              </CheckboxLabel>
              {isNewChecked && <XCircle style={{ marginLeft: 6 }} />}
            </Checkbox>
          </HStack>

          <Heading fontSize={"$sm"} color="$gray2" mt={"$4"}>
            Aceita troca?
          </Heading>

          <Switch
            trackColor={{
              false: tokens.colors.gray5,
              true: tokens.colors.blueLight,
            }}
            aria-live="polite"
          />

          <Heading fontSize={"$sm"} color="$gray2" mt={"$4"}>
            Meios de pagamento aceitos
          </Heading>

          {buildCheckbox({ value: "boleto", title: "Boleto" })}
          {buildCheckbox({ value: "pix", title: "Pix" })}
          {buildCheckbox({ value: "cash", title: "Dinheiro" })}
          {buildCheckbox({ value: "credit_card", title: "Cartão de crédito" })}
          {buildCheckbox({ value: "deposit", title: "Depósito Bancário" })}

          <HStack mt={"$12"} gap={12}>
            <Button title="Resetar filtros" isFlex variant="outline" />
            <Button title="Aplicar filtros" isFlex variant="link" />
          </HStack>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  );
}
