import { createContext } from "react";

export type AuthContextDataProps = {
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn(email: string, password: string) {
    console.log({ email, password });
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
