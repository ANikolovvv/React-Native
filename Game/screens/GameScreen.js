import { Text, View, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

function GameScreen({ userNumber }) {
  const initial = generateRandomBetween(min, max, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initial);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View style={styles.btnContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "creater")}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View>{/*LOG ROUNDS*/}</View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  btnContainer: {
    flexDirection: "row",
  },
});
