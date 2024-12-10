import { json } from "react-router";
import { apiUrl } from "./mongoApi";

export async function getLessonById(id) {
  const url = `${apiUrl}/lessons/lessonById?id=${id}`;
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

export async function getLessonsByCourseId(courseId) {
  const url = `${apiUrl}/lessons/lessonByCourseId?courseId=${courseId}`;
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

export async function createLesson({ lessonName, courseId, lessonNumber }) {
  if (courseId === -1) {
  } else {
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
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export async function updateLesson(lesson) {
  const lessonBody = {
    courseId: `${lesson.courseId}`,
    name: `${lesson.name}`,
    lessonNumber: lesson.lessonNumber,
    description: lesson.description,
    content: lesson.content,
    quizzes: lesson.quizzes,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/lessons/updateLessonById?id=${lesson.id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(lessonBody),
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

export async function deleteLessonRequest(lessonId) {
  const url = `${apiUrl}/lessons/deleteLessonById?id=${lessonId}`;
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
