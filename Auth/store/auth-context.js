import { createContext, useEffect, useState } from "react";
import AsyncStrorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuth: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setToken] = useState();

  function authenticate(token) {
    setToken(token);
    AsyncStrorage.setItem("token", token);
  }

  function logout() {
    setToken(null);
    AsyncStrorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuth: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
