import { useRef } from "react";
import { Dimensions, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
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

const width = Dimensions.get("window").width;

const defaultDataWith6Colors = ["#B0604D", "#899F9C", "#B3C680"];

type RouteParamsProps = {
  isEdit: boolean;
};

export function AdDetails() {
  const { tokens } = gluestackUIConfig;
  const route = useRoute();
  const ref = useRef<ICarouselInstance>(null);
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { isEdit } = route.params as RouteParamsProps;

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

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <View style={{ position: "relative" }}>
          <Carousel
            data={defaultDataWith6Colors}
            width={width}
            height={width * 0.6}
            loop
            onProgressChange={progress}
            renderItem={({ index }) => (
              <Image
                source={{
                  uri: "https://thumbs.dreamstime.com/b/exposi%C3%A7%C3%A3o-de-sapatos-esportivos-nike-na-prateleira-da-loja-novi-micmichigan-oct-%C3%A9-uma-empresa-americana-que-projeta-marketing-259470358.jpg",
                }}
                flex={1}
                w={"$full"}
                resizeMode="cover"
                alt="alea"
              />
            )}
          />

          <Pagination.Basic
            progress={progress}
            data={defaultDataWith6Colors}
            dotStyle={{
              width: width / defaultDataWith6Colors.length,
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
              source={defaultUserPhotoImg}
              alt="Foto do usuário"
              h={"$8"}
              w={"$8"}
            />

            <Text>Felipe Alexandre</Text>
          </HStack>

          <Text
            px={"$2"}
            py={"$1"}
            bgColor="$gray5"
            alignSelf="flex-start"
            fontSize={"$xs"}
            rounded={"$full"}
            mt={"$6"}
          >
            USADO
          </Text>

          <HStack alignItems="baseline" mt={"$2"}>
            <Heading fontSize={"$xl"} flex={1}>
              Bicicleta
            </Heading>

            <Heading fontSize={"$sm"} mr={"$1"} color="$blueLight">
              R$
            </Heading>
            <Heading fontSize={"$xxl"} color="$blueLight">
              120,00
            </Heading>
          </HStack>

          <Text>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          <HStack alignItems="baseline" gap={6} mt={"$6"}>
            <Heading fontSize={"$md"}>Aceita troca?</Heading>
            <Text>Sim</Text>
          </HStack>

          <Heading fontSize={"$md"} mt={"$6"}>
            Meios de pagamento
          </Heading>
          <Text>Boleto</Text>
          <Text>Pix</Text>
          <Text>Dinheiro</Text>
          <Text>Cartão de crédito</Text>
          <Text>Depósito Bancário</Text>
        </VStack>
      </ScrollView>

      {isEdit && (
        <VStack px={"$8"} pb={"$10"} pt={"$3.5"} gap={"$2"}>
          <Button title="Desativar anúncio" variant="link" />
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
            120,00
          </Heading>
          <Button title="Entrar em contato" isFlex />
        </HStack>
      )}
    </VStack>
  );
}
