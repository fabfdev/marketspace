import { useCallback, useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { InputSearch } from "@components/InputSearch";
import { AdItem } from "@components/AdItem";
import { MyAdsButton } from "@components/MyAdsButton";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductsDTO } from "@dtos/ProductsDTO";

export function Home({ openSheet }: { openSheet: () => void }) {
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
    navigator.navigate("adDetails", { isEdit: false });
  }

  function handleOpenMyAds() {
    navigator.navigate("myAds");
  }

  function handleOpenCreationAd() {
    navigator.navigate("creationEditionAd");
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
    <VStack flex={1} pt={"$16"} px={"$8"} bgColor="$gray6">
      <HStack>
        <UserPhoto
          source={defaultUserPhotoImg}
          alt="Foto do usuário"
          h={"$12"}
          w={"$12"}
        />

        <VStack flex={1} ml={"$2"}>
          <Text fontSize={"$md"}>Boas vindas, </Text>
          <Heading fontSize={"$md"}>Felipe</Heading>
        </VStack>

        <Button
          title="Criar anúncio"
          variant="link"
          isAuto
          onPress={handleOpenCreationAd}
        />
      </HStack>

      <FlatList
        data={data}
        keyExtractor={(item) => (item as { id: string; title: string }).id}
        numColumns={2}
        renderItem={({ item }) => <AdItem onClick={handleOpenDetails} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 20 }}
        pt={"$10"}
        ListHeaderComponent={() => (
          <>
            <Text>Seus produtos anunciados para venda</Text>

            <MyAdsButton
              myActiveAdsSize={userProducts.length}
              onPress={handleOpenMyAds}
            />

            <Text mt={"$10"}>Compre produtos variados</Text>

            <InputSearch mt={"$4"} mb={"$6"} handleFilter={openSheet} />
          </>
        )}
      />
    </VStack>
  );
}
