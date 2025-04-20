import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import Logo from "@assets/logo.svg";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { ButtonEdit } from "@components/ButtonEdit";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
  return (
    <ScrollView
      w={"$full"}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bg="$gray6" flex={1} w={"$full"} px={"$12"}>
        <Center flex={1}>
          <Logo />

          <Heading>Boas vindas!</Heading>
          <Text textAlign="center" mt={"$2"}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Box position="relative" mt={"$5"} mb={"$3"}>
            <UserPhoto
              source={defaultUserPhotoImg}
              alt="Foto do usuário"
              size="lg"
            />
            <ButtonEdit
              position="absolute"
              alignSelf="flex-end"
              bottom={0}
              right={-10}
            />
          </Box>

          <Input placeholder="Nome" />

          <Input placeholder="E-mail" />

          <Input placeholder="Telefone" />

          <Input placeholder="Senha" />

          <Input placeholder="Confirmar senha" />

          <Button title="Criar" variant="link" mt={"$2"} />
        </Center>

        <Text textAlign="center" mb={"$4"}>
          Já tem uma conta?
        </Text>

        <Button title="Ir para o login" variant="outline" mb={"$8"} />
      </VStack>
    </ScrollView>
  );
}
