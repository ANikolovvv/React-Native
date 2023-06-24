import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";

import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuth, setIsAuth] = useState(false);
  const ctx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      ctx.authenticate(token);
    } catch (error) {
      setIsAuth(false);
      Alert.alert("Authentication failed!", "Could not create user.");
    }

  }

  if (isAuth) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
