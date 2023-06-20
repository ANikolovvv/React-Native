import { StyleSheet } from "react-native";

import ExpensesOutput from "../components/Output/ExpensesOutput";
import { useContext, useEffect, useState } from "react";

import { getDateMinusDate } from "../util/date";
import { ExpensesContext } from "../store/expenses-context";

import { fetchExpenses } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const ctx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        ctx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loading />;
  }
  const recent = ctx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDays = getDateMinusDate(today, 7);

    return expense.date > sevenDays && expense.date <= today;
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
