import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const theme = DefaultTheme;

  const { user } = useAuth();

  return (
    <Box flex={1}>
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
