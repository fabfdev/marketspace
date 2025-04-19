import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      w={"$full"}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack w={"$full"} flex={1}>
        <Center
          bg="$gray6"
          px={"$16"}
          py={"$16"}
          borderBottomLeftRadius="$3xl"
          borderBottomRightRadius="$3xl"
          flex={1}
        >
          <Logo />

          <Heading color="$gray1" fontFamily="$heading" fontSize={"$xxl"}>
            marketspace
          </Heading>
          <Text color="$gray3" fontFamily="$body">
            Seu espaço de compra e venda
          </Text>

          <Text color="$gray3" fontFamily="$body" mt={"$16"} mb={"$4"}>
            Acesse sua conta
          </Text>

          <Input placeholder="E-mail" />

          <Input placeholder="Senha" />

          <Button title="Entrar" mt={"$8"} />
        </Center>

        <Center gap={"$4"} bg="$gray7" px={"$16"} h={"$56"}>
          <Text>Ainda não tem acesso?</Text>

          <Button title="Criar uma conta" variant="outline" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
