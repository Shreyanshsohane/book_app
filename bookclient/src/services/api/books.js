import { baseURl } from "../../constant";

export default async function getAllBooks() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${baseURl}book/getAll`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch books: ${response.status} ${errorBody}`);
  }

  return await response.json(); // returns { books: [...] }
}
