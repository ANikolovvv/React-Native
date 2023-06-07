import { Text, View, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
// import { useContext } from "react";
// import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { useDispatch, useSelector } from "react-redux";

function FavoritesScreen({}) {
  //const mealsList = useContext(FavoritesContext);
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const favoriteMeals = MEALS.filter((meal) => favoriteMealsIds.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>You have no favorite meals yet!</Text>
      </View>
    );
  }
  return <MealsList items={favoriteMeals} />;
}
export default FavoritesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
