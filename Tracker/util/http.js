import axios from "axios";

const URL =
  "https://react-native-6cbd7-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeExpense(data) {
  const res = await axios.post(URL + "expenses.json", data);
  const id = res.data.name;
  return id;
}

export async function fetchExpenses() {
  const res = await axios.get(URL + "expenses.json");

  const expenses = [];
  for (const key in res.data) {
    const obj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(obj);
  }
  return expenses;
}

export function updateExpense(id, newData) {
  return axios.put(URL + `expenses/${id}.json`, newData);
}

export function deleteExpense(id) {
  return axios.delete(URL + `expenses/${id}.json`);
}
