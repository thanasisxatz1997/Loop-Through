import { apiUrl } from "./mongoApi";

export async function getQuizzes() {
  const url = `${apiUrl}/quizzes/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("at response data: ", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getQuizById(id) {
  const url = `${apiUrl}/quizzes/quizById?id=${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("at response data: ", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
