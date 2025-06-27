import { Toolbar } from "@components/Toolbar";
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
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Plus } from "phosphor-react-native";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Switch } from "@components/Switch";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";

export function CreationEditionAd() {
  const { tokens } = gluestackUIConfig;
  const { goBack } = useNavigation();
  return (
    <VStack flex={1}>
      <Toolbar title="Criar anúncio" handleBack={goBack}/>

      <ScrollView showsVerticalScrollIndicator={false} px={"$8"} contentContainerStyle={{ paddingBottom: 24 }}>
        <Heading fontSize={"$md"} mt={"$6"}>
          Imagens
        </Heading>

        <Text fontSize={"$sm"}>
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível
        </Text>

        <Pressable
          w={"$24"}
          h={"$24"}
          bgColor="$gray5"
          borderRadius={6}
          alignItems="center"
          justifyContent="center"
          mt={"$4"}
        >
          <Plus color={tokens.colors.gray4} />
        </Pressable>

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
        <Button title="Cancelar" isFlex variant="outline" onPress={goBack}/>
        <Button title="Avançar" isFlex variant="link"/>
      </HStack>
    </VStack>
  );
}
