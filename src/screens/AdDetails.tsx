import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ProductsDTO } from "@dtos/ProductsDTO";
import { useInputFormatter } from "@hooks/useInputFormatter";

const width = Dimensions.get("window").width;

type RouteParamsProps = {
  isEdit: boolean;
  productId: string;
};

export function AdDetails() {
  const { tokens } = gluestackUIConfig;

  const ref = useRef<ICarouselInstance>(null);

  const route = useRoute();
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDisable, setIsLoadingDisable] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductsDTO>(
    {} as ProductsDTO
  );
  const { formatToPrice } = useInputFormatter();

  const { isEdit, productId } = route.params as RouteParamsProps;

  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  function handleBack() {
    navigator.goBack();
  }

  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/products/${productId}`);
      setProductDetails(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function disableAd() {
    try {
      setIsLoadingDisable(true);
      await api.patch(`/products/${productId}`, { is_active: !productDetails.is_active });
      navigator.goBack();
    } catch (error) {
      setIsLoadingDisable(false);
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return (
    <VStack bgColor="$gray6" flex={1} pt={"$16"}>
      <HStack mx={"$8"} pb={"$6"} justifyContent="space-between">
        <Pressable onPress={handleBack}>
          <ArrowLeft />
        </Pressable>

        {isEdit && (
          <Pressable>
            <PencilSimpleLine />
          </Pressable>
        )}
      </HStack>

      {!isLoading && (
        <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
          <View style={{ position: "relative" }}>
            <Carousel
              data={productDetails.product_images}
              width={width}
              height={width * 0.6}
              loop
              onProgressChange={progress}
              renderItem={({ item }) => (
                <>
                  <Image
                    source={{
                      uri: `${api.defaults.baseURL}/images/${item.path}`,
                    }}
                    flex={1}
                    w={"$full"}
                    resizeMode="cover"
                    alt="alea"
                  />
                  {!productDetails.is_active && (
                    <Box
                      position="absolute"
                      bgColor="$black50alpha"
                      w={"$full"}
                      h={"$full"}
                      rounded={"$md"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        color={"$gray7"}
                        fontSize={"$sm"}
                        fontFamily="$heading"
                        mx={"$1"}
                        mb={"$2"}
                      >
                        ANÚNCIO DESATIVADO
                      </Text>
                    </Box>
                  )}
                </>
              )}
            />

            <Pagination.Basic
              progress={progress}
              data={productDetails.product_images}
              dotStyle={{
                width: width / productDetails.product_images.length,
                height: 4,
                backgroundColor: tokens.colors.gray7opacity50,
                borderRadius: 16,
              }}
              activeDotStyle={{
                overflow: "hidden",
                backgroundColor: tokens.colors.gray7opacity75,
                borderRadius: 16,
              }}
              containerStyle={{
                overflow: "hidden",
                gap: 4,
                marginBottom: 4,
                position: "absolute",
                bottom: 0,
                left: 4,
                right: 4,
              }}
              horizontal
              onPress={onPressPagination}
            />
          </View>

          <VStack mx={"$8"} mt={"$6"}>
            <HStack alignItems="center" gap={"$2"}>
              <UserPhoto
                source={
                  productDetails.user.avatar
                    ? {
                        uri: `${api.defaults.baseURL}/images/${productDetails.user.avatar}`,
                      }
                    : defaultUserPhotoImg
                }
                alt="Foto do usuário"
                h={"$8"}
                w={"$8"}
              />

              <Text>{productDetails.user.name}</Text>
            </HStack>

            <Text
              px={"$2"}
              py={"$1"}
              bgColor={!productDetails.is_new ? "$gray5" : "$blueLight"}
              color={!productDetails.is_new ? "$blue" : "$white"}
              alignSelf="flex-start"
              fontSize={"$xs"}
              rounded={"$full"}
              mt={"$6"}
            >
              {!productDetails.is_new ? "USADO" : "NOVO"}
            </Text>

            <HStack alignItems="baseline" mt={"$2"}>
              <Heading fontSize={"$xl"} flex={1}>
                {productDetails.name}
              </Heading>

              <Heading fontSize={"$sm"} mr={"$1"} color="$blueLight">
                R$
              </Heading>
              <Heading fontSize={"$xxl"} color="$blueLight">
                {formatToPrice(String(productDetails.price))}
              </Heading>
            </HStack>

            <Text>{productDetails.description}</Text>

            <HStack alignItems="baseline" gap={6} mt={"$6"}>
              <Heading fontSize={"$md"}>Aceita troca?</Heading>
              <Text>{productDetails.accept_trade ? "Sim" : "Não"}</Text>
            </HStack>

            <Heading fontSize={"$md"} mt={"$6"}>
              Meios de pagamento
            </Heading>
            {productDetails.payment_methods.map((item) => (
              <Text key={item.key}>{item.name}</Text>
            ))}
          </VStack>
        </ScrollView>
      )}

      {isEdit && (
        <VStack px={"$8"} pb={"$10"} pt={"$3.5"} gap={"$2"}>
          <Button
            title={
              !productDetails.is_active
                ? "Reativar anúncio"
                : "Desativar anúncio"
            }
            variant={!productDetails.is_active ? "solid" : "link"}
            onPress={disableAd}
          />
          <Button title="Excluir anúncio" variant="outline" />
        </VStack>
      )}

      {!isEdit && (
        <HStack
          px={"$8"}
          pb={"$10"}
          pt={"$3.5"}
          bgColor="$gray7"
          alignItems="baseline"
        >
          <Heading fontSize={"$sm"} color="$blueLight">
            R$
          </Heading>
          <Heading flex={1} fontSize={"$xxl"} color="$blueLight">
            {formatToPrice(String(productDetails.price))}
          </Heading>
          <Button title="Entrar em contato" isFlex />
        </HStack>
      )}
    </VStack>
  );
}
