import { apiUrl } from "./mongoApi";

export async function getQuizzes() {
  const url = `${apiUrl}/quizzes/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
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
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createQuiz(newQuiz) {
  // 1. Creating a course
  const quiz = {
    name: newQuiz.name,
    questions: [],
    authorId: newQuiz.authorId,
    description: newQuiz.description,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/quizzes/new`;
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

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateQuiz(quiz) {
  const quizBody = {
    name: `${quiz.name}`,
    description: quiz.description,
    questions: quiz.questions,
    difficulty: quiz.quizzes,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/quizzes/updateQuizById?id=${quiz.id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(quizBody),
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteQuizRequest(quizId) {
  const url = `${apiUrl}/quizzes/deleteQuizById?id=${quizId}`;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
