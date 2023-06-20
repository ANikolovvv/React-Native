import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constans/style";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/Manage/ExpenseForm";

import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const ctx = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = ctx.expenses.find((x) => x.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setSubmitting(true);
    try {
      await deleteExpense(expenseId);
      ctx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!");
    }
    setSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setSubmitting(true);
    try {
      if (isEditing) {
        ctx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        ctx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not update or add expense!");
      setSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteBox}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteBox: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
