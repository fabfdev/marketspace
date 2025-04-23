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

import { SheetFilter } from "@components/SheetFilter";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const sheetFilterRef = useRef<BottomSheet>(null);

  function handleOpenSheet() {
    sheetFilterRef?.current?.snapToIndex(0);
  }

  return (
    <>
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
          name="home"
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
                  onPress: () => console.log("Sair"),
                  style: "destructive",
                },
                {
                  text: "Cancelar",
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

      <SheetFilter bottomSheetRef={sheetFilterRef} />
    </>
  );
}
