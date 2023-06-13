import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/Output/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const ctx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={ctx.expenses}
      expensesPeriod={"Total"}
      fallbackText={"No registered expenses found!"}
    />
  );
}
export default AllExpenses;

const styles = StyleSheet.create({});
