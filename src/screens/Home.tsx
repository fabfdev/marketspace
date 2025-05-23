import { FlatList } from "react-native";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { InputSearch } from "@components/InputSearch";
import { AdItem } from "@components/AdItem";
import { MyAdsButton } from "@components/MyAdsButton";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home({ openSheet }: { openSheet: () => void }) {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

  function handleOpenDetails() {
    navigator.navigate("adDetails");
  }

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

        <Button title="Criar anúncio" variant="link" isAuto />
      </HStack>

      <Text mt={"$10"}>Seus produtos anunciados para venda</Text>

      <MyAdsButton />

      <Text mt={"$10"}>Compre produtos variados</Text>

      <InputSearch mt={"$4"} handleFilter={openSheet} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <AdItem onClick={handleOpenDetails} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
        columnWrapperStyle={{ gap: 20 }}
      />
    </VStack>
  );
}
