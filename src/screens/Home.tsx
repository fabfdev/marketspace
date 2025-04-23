import { FlatList } from "react-native";
import { Heading, HStack, Text, VStack, Pressable } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Tag, ArrowRight, TextT } from "phosphor-react-native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { InputSearch } from "@components/InputSearch";
import { AdItem } from "@components/AdItem";

export function Home() {
  const { tokens } = gluestackUIConfig;

  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

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

      <Pressable
        onPress={() => console.log("asd")}
        bgColor="$blueLightAlpha"
        p="$4"
        rounded={"$lg"}
        $active-bg="$blueLightAlpha2"
        mt={"$4"}
      >
        <HStack alignItems="center">
          <Tag color={tokens.colors.blue} />
          <VStack ml={"$4"} flex={1}>
            <Heading>4</Heading>
            <Text>anúncios ativos</Text>
          </VStack>

          <Text color="$blue" mr={"$4"} fontFamily="$heading">
            Meus anúncios
          </Text>
          <ArrowRight color={tokens.colors.blue} />
        </HStack>
      </Pressable>

      <Text mt={"$10"}>Compre produtos variados</Text>

      <InputSearch mt={"$4"} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <AdItem />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
        columnWrapperStyle={{ gap: 20 }}
      />
    </VStack>
  );
}
