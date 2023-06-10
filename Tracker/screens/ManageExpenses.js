import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function ManageExpenses({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>Manage</Text>;
}
export default ManageExpenses;

const styles = StyleSheet.create({});
