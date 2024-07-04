import { apiUrl } from "./mongoApi";

export async function getLessonsById(id) {
  const url = `${apiUrl}/lessons/lessonById?id=${id}`;
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

export async function getLessonsByCourseId(courseId) {
  const url = `${apiUrl}/lessons/lessonByCourseId?courseId=${courseId}`;
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

export async function createLesson({ lessonName, courseId, lessonNumber }) {
  console.log("inside api call", lessonName, courseId, lessonNumber);
  const lesson = {
    courseId: `${courseId}`,
    name: `${lessonName}`,
    lessonNumber: lessonNumber,
    description: "A new Lesson",
    content: [],
    quizzes: [],
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/lessons/new`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(lesson),
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
