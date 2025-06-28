import { useState } from "react";
import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";

import Logo from "@assets/logo.svg";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { api } from "@services/api";

import { UserPhoto } from "@components/UserPhoto";
import { ButtonEdit } from "@components/ButtonEdit";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  phone: yup.string().required("Informe o telefone").min(10).max(11),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
  confirm_password: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
});

export function SignUp() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  async function handleImageSelection() {
    try {
      setIsImageLoading(true);
      const imageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
        aspect: [4, 4]
      })

      if (imageSelected.canceled) {
        return;
      }

      const photoUri = imageSelected.assets[0].uri;

      if (photoUri) {
        setUserPhoto(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageLoading(false);
    }
  }

  async function handleSignUp({ name, email, phone, password }: FormDataProps) {
    try {
      setIsLoading(true);
      const data = new FormData();

      data.append("name", name);
      data.append("email", email);
      data.append("tel", phone);
      data.append("password", password);

      await api.post("/users", data, { headers: { "Content-Type": "multipart/form-data" } });
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro";
      console.log(message);
    }
  }

  function handleSignIn() {
    navigator.goBack();
  }

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
              source={userPhoto ? { uri: userPhoto } : defaultUserPhotoImg}
              alt="Foto do usuário"
              size="lg"
            />
            <ButtonEdit
              position="absolute"
              alignSelf="flex-end"
              bottom={0}
              right={-10}
              onPress={handleImageSelection}
            />
          </Box>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Criar"
            variant="link"
            mt={"$2"}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Text textAlign="center" mb={"$4"}>
          Já tem uma conta?
        </Text>

        <Button
          title="Ir para o login"
          variant="outline"
          mb={"$8"}
          onPress={handleSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
