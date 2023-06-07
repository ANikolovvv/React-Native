import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
///import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  //const favoriteCtx = useContext(FavoritesContext);

  const mealIsFavorite = favoriteMealsIds.includes(mealId);

  function buttonPressHandler() {
    if (mealIsFavorite) {
      //favoriteCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      //favoriteCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            press={buttonPressHandler}
          />
        );
      },
    });
  }, [navigation, buttonPressHandler]);
  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title} </Text>
      <MealDetails
        style={[styles.info]}
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
      />

      <View style={styles.listMainContainer}>
        <View style={styles.listContainer}>
          <Subtitle>
            <Text>Ingredients</Text>
          </Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>
            <Text>Steps</Text>
          </Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}
export default MealDetailsScreen;

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },

  info: {
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listMainContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
