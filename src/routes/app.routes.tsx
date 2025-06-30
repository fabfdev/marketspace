import { useRef } from "react";
import { Alert, Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { House, Tag, SignOut } from "phosphor-react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { Logout } from "@screens/Logout";
import { AdDetails } from "@screens/AdDetails";
import { CreationEditionAd } from "@screens/CreationEditionAd";

import { SheetFilter } from "@components/SheetFilter";
import { useAuth } from "@hooks/useAuth";

type AppRoutes = {
  home: undefined;
  ads: undefined;
  myAds: undefined;
  logout: undefined;
  adDetails: {
    isEdit: boolean;
    productId: string;
  };
  creationEditionAd: {
    productId: string;
  } | undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const sheetFilterRef = useRef<BottomSheet>(null);

  const { signOut } = useAuth();

  function handleOpenSheet() {
    sheetFilterRef?.current?.snapToIndex(0);
  }

  function TabNavigator() {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: tokens.colors.gray2,
          tabBarInactiveTintColor: tokens.colors.gray4,
          tabBarStyle: {
            backgroundColor: tokens.colors.gray7,
            borderTopWidth: 0,
            height: Platform.OS === "ios" ? 96 : 70,
            paddingBottom: tokens.space["10"],
            paddingTop: tokens.space["3.5"],
          },
        }}
      >
        <Screen
          name="ads"
          options={{
            tabBarIcon: ({ color }) => (
              <House color={color} size={tokens.space[6]} />
            ),
          }}
        >
          {() => <Home openSheet={handleOpenSheet} />}
        </Screen>

        <Screen
          name="myAds"
          component={MyAds}
          options={{
            tabBarIcon: ({ color }) => (
              <Tag color={color} size={tokens.space[6]} />
            ),
          }}
        />

        <Screen
          name="logout"
          component={Logout}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Alert.alert("Sair", "Deseja sair?", [
                {
                  text: "Sim",
                  onPress: async () => await signOut(),
                  style: "destructive",
                },
                {
                  text: "Não",
                  onPress: () => console.log("não"),
                  style: "cancel",
                },
              ]);
            },
          }}
          options={{
            tabBarIcon: () => (
              <SignOut color={tokens.colors.redLight} size={tokens.space[6]} />
            ),
          }}
        />
      </Navigator>
    );
  }

  return (
    <>
      <StackNavigator screenOptions={{ headerShown: false }}>
        <StackScreen name="home" component={TabNavigator} />
        <StackScreen name="adDetails" component={AdDetails} />
        <StackScreen name="creationEditionAd" component={CreationEditionAd} />
      </StackNavigator>
      <SheetFilter bottomSheetRef={sheetFilterRef} />
    </>
  );
}
