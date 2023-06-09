import { StyleSheet, View, Text } from "react-native";

function ExpensesSummary({ expenses, periodName }) {
  const sum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${sum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
const styles = StyleSheet.create({});
