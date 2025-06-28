import { useState } from "react";
import {
  Center,
  Heading,
  onChange,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "@assets/logo.svg";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail"),
  password: yup.string().required("Informe a senha")
})

export function SignIn() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleSignUp() {
    navigator.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      console.log({email, password})
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    }
  }

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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                returnKeyType="next"
                inputMode="email"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                returnKeyType="done"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Entrar"
            mt={"$8"}
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center gap={"$4"} bg="$gray7" px={"$16"} h={"$56"}>
          <Text>Ainda não tem acesso?</Text>

          <Button
            title="Criar uma conta"
            variant="outline"
            onPress={handleSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
