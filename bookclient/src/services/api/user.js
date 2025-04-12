import { baseURl } from "../../constant";

export default async function getUser() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${baseURl}user/getUser`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch user: ${response.status} ${errorBody}`);
  }

  return await response.json(); // returns { books: [...] }
}
