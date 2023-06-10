import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constans/style";

const EXPENSES_ARRAY = [
  {
    id: "e1",
    description: "water",
    amount: 30.96,
    date: new Date("2023-01-15"),
  },
  {
    id: "e2",
    description: "food",
    amount: 300.96,
    date: new Date("2023-02-28"),
  },
  {
    id: "e3",
    description: "shoes",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
  {
    id: "e4",
    description: "food",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
  {
    id: "e5",
    description: "new shoes ",
    amount: 130.96,
    date: new Date("2023-05-1"),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={EXPENSES_ARRAY} />
      <ExpensesList expenses={EXPENSES_ARRAY} />
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
