import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";

import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constans/style";

function ExpenseForm({ onCancel, onSubmit, submitLabel, defaultValues }) {
  const [inputValue, setValue] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(type, enteredText) {
    setValue((state) => {
      return { ...state, [type]: { value: enteredText, isValid: true } };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount:+inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid input");
      setValue((state) => {
        return {
          amount: { value: state.amount.value, isValid: amountIsValid },
          date: { value: state.date.value, isValid: dateIsValid },
          description: {
            value: state.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsValid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.row}
          label="Amount"
          invalid={!inputValue.amount.isValid}
          textInput={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          invalid={!inputValue.date.isValid}
          textInput={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValue.description.isValid}
        textInput={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description.value,
          //autocorrect: false,
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buutons}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  buutons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
