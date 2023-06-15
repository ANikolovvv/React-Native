import { StyleSheet, View } from "react-native";

import ExpensesOutput from "../components/Output/ExpensesOutput";
import { useContext } from "react";
import { getDateMinusDate } from "../util/date";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const ctx = useContext(ExpensesContext);
  const recent = ctx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDays = getDateMinusDate(today, 7);

    return (expense.date > sevenDays) && (expense.date <= today);
  });

  return (
    <ExpensesOutput
      expenses={recent}
      expensesPeriod={"Last 7 days."}
      fallbackText={"No expenses registered for the last 7 days."}
    />
  );
}
export default RecentExpenses;

const styles = StyleSheet.create({});
