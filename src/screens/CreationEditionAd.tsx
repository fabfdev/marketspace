import { useState } from "react";
import {
  Heading,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  Text,
  VStack,
  CircleIcon,
  RadioLabel,
  ScrollView,
  HStack,
  FlatList,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Plus } from "phosphor-react-native";

import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Switch } from "@components/Switch";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Toolbar } from "@components/Toolbar";
import { ImageAdCreation } from "@components/ImageAdCreation";

import { ImagesDTO } from "@dtos/ImagesDTO";

export function CreationEditionAd() {
  const { tokens } = gluestackUIConfig;

  const { goBack } = useNavigation();

  const [imagesData, setImagesData] = useState<ImagesDTO[]>([] as ImagesDTO[]);

  async function handleImageSelection() {
    try {
      const imagesSelected = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: "images",
        quality: 1,

        aspect: [4, 4],
      });

      if (imagesSelected.canceled) {
        return;
      }

      let images = [] as ImagesDTO[];
      imagesSelected.assets.forEach(({ fileName, uri, type }) => {
        images.push({ fileName, uri, type } as ImagesDTO);
      });
      setImagesData(images);
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageDeletion(_index: number) {
    const newData = imagesData.filter(({  }, index) => index !== _index);
    setImagesData(newData);
  }

  return (
    <VStack flex={1}>
      <Toolbar title="Criar anúncio" handleBack={goBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        px={"$8"}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Heading fontSize={"$md"} mt={"$6"}>
          Imagens
        </Heading>

        <Text fontSize={"$sm"}>
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível
        </Text>

        <FlatList
          data={imagesData}
          mt={"$4"}
          renderItem={({ item, index }) => (
            <ImageAdCreation
              item={item as ImagesDTO}
              onDelete={() => handleImageDeletion(index)}
              key={index}
            />
          )}
          horizontal
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => (
            <Pressable
              w={"$24"}
              h={"$24"}
              bgColor="$gray5"
              borderRadius={6}
              alignItems="center"
              justifyContent="center"
              onPress={handleImageSelection}
            >
              <Plus color={tokens.colors.gray4} />
            </Pressable>
          )}
        />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Sobre o produto
        </Heading>

        <Input placeholder="Título do produto" />
        <Textarea placeholder="Descrição do produto" />

        <RadioGroup flexDirection="row" justifyContent="space-evenly">
          <Radio value="new" gap={"$2"}>
            <RadioIndicator $checked-borderColor="$blueLight">
              <RadioIcon as={CircleIcon} color="$blueLight" />
            </RadioIndicator>
            <RadioLabel>Produto novo</RadioLabel>
          </Radio>

          <Radio value="old" gap={"$2"}>
            <RadioIndicator $checked-borderColor="$blueLight">
              <RadioIcon as={CircleIcon} color="$blueLight" />
            </RadioIndicator>
            <RadioLabel>Produto usado</RadioLabel>
          </Radio>
        </RadioGroup>

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Venda
        </Heading>

        <Input placeholder="Valor do produto" />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Aceita troca?
        </Heading>

        <Switch />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Meios de pagamento aceitos
        </Heading>

        <Checkbox value="billet" title="Boleto" />
        <Checkbox value="pix" title="Pix" />
        <Checkbox value="cash" title="Dinheiro" />
        <Checkbox value="credit_card" title="Cartão de crédito" />
        <Checkbox value="deposit" title="Depósito bancário" />
      </ScrollView>

      <HStack pb={"$8"} bgColor="$white" px={"$8"} pt={"$4"} gap={"$3"}>
        <Button title="Cancelar" isFlex variant="outline" onPress={goBack} />
        <Button title="Avançar" isFlex variant="link" />
      </HStack>
    </VStack>
  );
}
