import { useLayoutEffect } from "react";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
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
  return <MealsList items={mealsArray} />;
}
export default MealsOverviewScreen;
