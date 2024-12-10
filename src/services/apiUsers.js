import { apiUrl } from "./mongoApi";

export async function createUser(userId) {
  const user = {
    id: userId,
    courses: [],
    quizzes: [],
    ratings: [],
    settings: {},
  };
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
      console.log("Successfully created user data!");
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error("Error while creating user. ", error.messsage);
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

export async function addUserCourse(courseId, user) {
  const oldCourses = user.courses;
  const newCourses = [...oldCourses, courseId];
  const requestBody = {
    courses: newCourses,
  };
  updateUser(user.id, requestBody);
}

export async function deleteUserCourse(courseId, user) {
  const oldCourses = user.courses;
  const newCourses = oldCourses.filter((course) => course !== courseId);
  const requestBody = {
    courses: newCourses,
  };
  updateUser(user.id, requestBody);
}

export async function addUserQuiz(quizId, user) {
  const oldQuizzes = user.quizzes;
  const newQuizzes = [...oldQuizzes, quizId];
  const requestBody = {
    quizzes: newQuizzes,
  };
  updateUser(user.id, requestBody);
}

export async function deleteUserQuiz(quizId, user) {
  const oldQuizzes = user.quizzes;
  const newQuizzes = oldQuizzes.filter((quiz) => quiz !== quizId);
  const requestBody = {
    quizzes: newQuizzes,
  };
  updateUser(user.id, requestBody);
}
