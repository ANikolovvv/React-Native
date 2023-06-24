import axios from "axios";

const API_KEY = "AIzaSyDkHHbeHuyPhm_SVhEvtsNaWxkz7K16U-w";

export async function auth(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = res.data.idToken;
  console.log(res.data);
  return token;
}

export function createUser(email, password) {
  return auth("signUp", email, password);
}

export function login(email, password) {
  return auth("signInWithPassword", email, password);
}
