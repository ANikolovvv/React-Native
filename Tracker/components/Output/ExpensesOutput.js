import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

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
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View>
      <ExpensesSummary periodName={expensesPeriod} expenses={EXPENSES_ARRAY} />
      <ExpensesList expenses={EXPENSES_ARRAY} />
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({});
