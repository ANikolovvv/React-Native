import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
//import { useRoute } from "@react-navigation/native";

function MealsOverviewScreen({ route, navigation }) {
  //const route = useRoute();
  const categoryId = route.params.categoryId;
  const mealsArray = MEALS.filter((x) => {
    return x.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;
    console.log(categoryTitle, "id");
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  function renderMeal(itemData) {
    return (
      <>
        <MealItem
          id={itemData.item.id}
          title={itemData.item.title}
          url={itemData.item.imageUrl}
          duration={itemData.item.duration}
          complexity={itemData.item.complexity}
          affordability={itemData.item.affordability}
        />
      </>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={mealsArray}
          keyExtractor={(item) => item.id}
          renderItem={renderMeal}
        />
      </View>
    </>
  );
}
export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
