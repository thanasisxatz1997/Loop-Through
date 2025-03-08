import { getAuthToken } from "./apiAuth";
import { apiUrl } from "./mongoApi";

export async function getUserCourseRatings(userId) {
  const url = `${apiUrl}/ratings/course?id=${userId}`;
  try {
    const response = await fetch(url);
    console.log("Inside here", response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserQuizRatings(userId) {
  const url = `${apiUrl}/ratings/quiz?id=${userId}`;
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

export async function rateCourseRequest(courseRating) {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/ratings/course`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(courseRating),
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // const data = await response.json();
    // return data;
  } catch (error) {
    throw new Error(`Error while rating ${error}`);
  }
}

export async function rateQuizRequest(quizRating) {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/ratings/quiz`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(quizRating),
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while rating ${error}`);
  }
}
