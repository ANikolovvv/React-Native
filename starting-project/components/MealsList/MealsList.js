import MealItem from "./MealItem";
import { View, FlatList, StyleSheet } from "react-native";

function MealsList({items}) {
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
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderMeal}
        />
      </View>
    </>
  );
}
export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
