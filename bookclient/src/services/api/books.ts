import { baseURl } from "../../constant";

export async function getAllBooks() {
  const token = localStorage.getItem("token");
  console.log(token);
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

export async function getOwnerBooks() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${baseURl}book/getOwner`, {
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

const getToken = () => {
  return localStorage.getItem("token");
};

export const addBook = async (formdata: FormData) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await fetch(`${baseURl}book/add`, {
    method: "POST",
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: formdata,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add book: ${response.status} ${errorText}`);
  }

  return response.text();
};

export const updateBook = async (id: string, formdata: FormData) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await fetch(`${baseURl}book/update/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: formdata,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update book: ${response.status} ${errorText}`);
  }

  return response.text();
};

export const deleteBook = async (bookId: string) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const response = await fetch(`${baseURl}book/delete/${bookId}`, {
    method: "DELETE",
    redirect: "follow",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete book");
  return await response.text();
};
