import { Text, StyleSheet, View } from "react-native";

function List({ data }) {
  return data.map((ingredient) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText} key={ingredient}>
        {ingredient}
      </Text>
    </View>
  ));
}
export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
