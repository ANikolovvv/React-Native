import { StyleSheet, View } from "react-native";

import ExpensesOutput from "../components/Output/ExpensesOutput";

function RecentExpenses() {
  return (
    <View>
      <ExpensesOutput expensesPeriod={"Last 7 days."} />
    </View>
  );
}
export default RecentExpenses;

const styles = StyleSheet.create({});
