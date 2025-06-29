import { useCallback, useEffect, useState } from "react";
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
  const [otherUserProducts, setOtherUserProducts] = useState<ProductsDTO[]>(
    [] as ProductsDTO[]
  );
  const [filterQuery, setFilterQuery] = useState("");

  function handleOpenDetails() {
    navigator.navigate("adDetails", { isEdit: false });
  }

  function handleOpenMyAds() {
    navigator.navigate("myAds");
  }

  function handleOpenCreationAd() {
    navigator.navigate("creationEditionAd");
  }

  function handleInputFilterQuery(value: string) {
    setFilterQuery(value);
  }

  async function fetchUserProducts() {
    try {
      const { data } = await api.get("/users/products");
      setUserProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    }
  }

  async function fetchOtherUserProducts() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/products", {
        params: {
          query: filterQuery,
        },
      });
      setOtherUserProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOtherUserProducts();
  }, [filterQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts();
      fetchOtherUserProducts();
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

      <Text mt={"$10"}>Seus produtos anunciados para venda</Text>

      <MyAdsButton
        myActiveAdsSize={userProducts.length}
        onPress={handleOpenMyAds}
      />

      <Text mt={"$10"}>Compre produtos variados</Text>

      <InputSearch
        mt={"$4"}
        handleFilter={openSheet}
        onChangeText={handleInputFilterQuery}
        value={filterQuery}
      />

      <FlatList
        data={otherUserProducts}
        //@ts-ignore
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          //@ts-ignore
          <AdItem item={item} onClick={handleOpenDetails} />
        )}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 20 }}
      />
    </VStack>
  );
}
