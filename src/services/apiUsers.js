import { apiUrl } from "./mongoApi";

export async function createUser(
  user = {
    id: "73276920-094a-4985-9402-5453821db434",
    courses: ["66866e20180a233560948bdc"],
    quizzes: ["668b14caf04dd0aa3c34090b"],
    ratings: [],
    settings: {},
  }
) {
  const url = `${apiUrl}/users/new`;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error while creating user. ", error.messsage);
  }
}

export async function getUserById(id) {
  const url = `${apiUrl}/users/userById?id=${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error while creating user. ", error.messsage);
  }
}

export async function updateUser(id, user = {}) {
  const url = `${apiUrl}/users/updateUserById?id=${id}`;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error while creating user. ", error.messsage);
  }
}

export async function deleteUser(id) {
  const url = `${apiUrl}/users/deleteUserById${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error while creating user. ", error.messsage);
  }
}
