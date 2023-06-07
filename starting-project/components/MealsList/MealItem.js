import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";

function MealItem({ id, title, url, duration, complexity, affordability }) {
  const navigation = useNavigation();

  function selectMealHandler() {
    navigation.navigate("MealDetailsScreen", {
      mealId: id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPress : null,
        ]}
        onPress={selectMealHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: url }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  );
}
export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black", //ios
    backgroundColor: "white",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },

  button: {
    flex: 1,
  },
  buttonPress: {
    opacity: 0.5,
  },
});
