import React, { useCallback } from "react";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { X } from "phosphor-react-native";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheet>;
};

export function SheetFilter({ bottomSheetRef }: Props) {
  const { tokens } = gluestackUIConfig;
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

          <HStack>
            
          </HStack>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  );
}
