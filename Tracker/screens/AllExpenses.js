import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/Output/ExpensesOutput";

function AllExpenses() {
  return <View><ExpensesOutput expensesPeriod={"Total"}/></View>;
}
export default AllExpenses;

const styles = StyleSheet.create({});
