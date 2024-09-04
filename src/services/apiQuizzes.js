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

export async function getQuizById({ id }) {
  const url = `${apiUrl}/quizzes/quizById?id=${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("returning", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getQuizzesByAuthorId(authorId) {
  const url = `${apiUrl}/quizzes/quizzesByAuthorId?authorId=${authorId}`;
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

export async function createQuiz(newQuiz) {
  console.log("Starting create Quiz");
  console.log(newQuiz);

  // 1. Creating a course
  console.log("inside api call", newQuiz.name);
  const quiz = {
    name: newQuiz.name,
    questions: [],
    authorId: newQuiz.authorId,
    description: newQuiz.description,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/quizzes/new`;
  console.log("before try");
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(quiz),
      headers: reqHeaders,
    });
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
