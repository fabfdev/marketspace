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
  CheckboxGroup,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";

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
import { useInputFormatter } from "@hooks/useInputFormatter";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

type FormDataProps = {
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
};

export function CreationEditionAd() {
  const { tokens } = gluestackUIConfig;

  const { goBack } = useNavigation();
  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues: {
      is_new: true,
      accept_trade: false,
      payment_methods: [],
    },
  });
  const { formatBRL, parseBRL } = useInputFormatter();

  const [isLoading, setIsLoading] = useState(false);
  const [imagesData, setImagesData] = useState<ImagesDTO[]>([] as ImagesDTO[]);
  const [displayValue, setDisplayValue] = useState("");

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

  async function handleImagesUploading(id: string) {
    try {
      const data = new FormData();
      data.append("product_id", id);

      imagesData.forEach((item, index) => {
        data.append("images", {
          name: item.fileName,
          uri: item.uri,
          type: item.type,
        } as any);
      });

      await api.post("/products/images", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageDeletion(_index: number) {
    const newData = imagesData.filter(({}, index) => index !== _index);
    setImagesData(newData);
  }

  async function handleAdCreation({
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  }: FormDataProps) {
    try {
      setIsLoading(true);
      const { data } = await api.post("/products", {
        name,
        description,
        is_new,
        price: price * 100,
        accept_trade,
        payment_methods,
      });
      await handleImagesUploading(data.id);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    }
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

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título do produto"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              placeholder="Descrição do produto"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              flexDirection="row"
              justifyContent="space-evenly"
              value={value ? "new" : "old"}
              onChange={(val) => onChange(val === "new")}
            >
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
          )}
        />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Venda
        </Heading>

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                placeholder="Valor do produto"
                keyboardType="numeric"
                value={displayValue}
                onChangeText={(text) => {
                  if (text === "") {
                    setDisplayValue("");
                    onChange(0);
                    return;
                  }

                  const formatted = formatBRL(text);
                  setDisplayValue(formatted);
                  onChange(parseBRL(formatted));
                }}
              />
            );
          }}
        />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Aceita troca?
        </Heading>

        <Controller
          control={control}
          name="accept_trade"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />

        <Heading fontSize={"$md"} mt={"$6"} mb={"$2"}>
          Meios de pagamento aceitos
        </Heading>

        <Controller
          control={control}
          name="payment_methods"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroup value={value || []} onChange={onChange}>
              <Checkbox value="boleto" title="Boleto" />
              <Checkbox value="pix" title="Pix" />
              <Checkbox value="cash" title="Dinheiro" />
              <Checkbox value="card" title="Cartão de crédito" />
              <Checkbox value="deposit" title="Depósito bancário" />
            </CheckboxGroup>
          )}
        />
      </ScrollView>

      <HStack pb={"$8"} bgColor="$white" px={"$8"} pt={"$4"} gap={"$3"}>
        <Button title="Cancelar" isFlex variant="outline" onPress={goBack} />
        <Button
          title="Avançar"
          isFlex
          variant="link"
          onPress={handleSubmit(handleAdCreation)}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );
}
