import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { AuthContextProvider } from "@contexts/AuthContext";

export function Routes() {
  const theme = DefaultTheme;

  return (
    <Box flex={1}>
      <NavigationContainer theme={theme}>
        <AuthContextProvider>
          <AuthRoutes />
        </AuthContextProvider>
      </NavigationContainer>
    </Box>
  );
}
