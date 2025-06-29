import { useCallback, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import {
  Center,
  Heading,
  HStack,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { CaretDown } from "phosphor-react-native";

import { AdItem } from "@components/AdItem";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ProductsDTO } from "@dtos/ProductsDTO";

const width = Dimensions.get("window").width;

export function MyAds() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [userProducts, setUserProducts] = useState<ProductsDTO[]>(
    [] as ProductsDTO[]
  );

  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

  function handleOpenDetails() {
    navigator.navigate("adDetails", { isEdit: true });
  }

  async function fetchUserProducts() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/users/products");
      setUserProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts();
    }, [])
  );

  return (
    <VStack bgColor="$gray6" flex={1} pt={"$16"}>
      <Center>
        <Heading>Meus anúncios</Heading>
      </Center>

      <VStack px={"$8"} pt={"$10"} flex={1}>
        <HStack alignItems="baseline">
          <Text flex={1} color="$gray2">
            {userProducts.length} anúncios
          </Text>

          <Select>
            <SelectTrigger
              borderColor="$gray5"
              rounded={"$lg"}
              p={"$3"}
              minWidth={width / 3}
            >
              <SelectInput
                placeholder="Selecionar"
                placeholderTextColor={"$gray1"}
                color="$gray1"
                fontFamily="$body"
              />
              <SelectIcon as={CaretDown} />
            </SelectTrigger>

            <SelectPortal>
              <SelectBackdrop />
              <SelectContent pb={"$12"}>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem value="all" label="Todos" />
                <SelectItem value="active" label="Ativo" />
                <SelectItem value="unactive" label="Desativado" />
                <SelectItem value="new" label="Novo" />
                <SelectItem value="used" label="Usado" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>

        <FlatList
          data={userProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <AdItem
              item={item}
              isMine
              onClick={handleOpenDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 24 }}
          columnWrapperStyle={{ gap: 20 }}
        />
      </VStack>
    </VStack>
  );
}
