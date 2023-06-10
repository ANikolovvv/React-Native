import { StyleSheet, View, } from "react-native";
import ExpensesOutput from "../components/Output/ExpensesOutput";

function AllExpenses() {
  return <ExpensesOutput expensesPeriod={"Total"}/>;
}
export default AllExpenses;

const styles = StyleSheet.create({});
