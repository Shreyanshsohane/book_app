import { baseURl } from "../../constant";

export default async function loginUser(email, password) {
  const url = `${baseURl}auth/login`;

  const payload = { email, password };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  // Cache the login result
  localStorage.setItem("token", result.token);
  localStorage.setItem("user", JSON.stringify(result.user));

  return result;
}
