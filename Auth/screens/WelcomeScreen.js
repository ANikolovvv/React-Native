import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const ctx = useContext(AuthContext);

  const token = ctx.token;

  useEffect(() => {
    axios
      .get(
        "https://react-native-6cbd7-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((res) => {
        setFetchedMessage(res.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
