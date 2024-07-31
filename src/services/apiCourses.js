import { apiUrl } from "./mongoApi";

export async function getCourses() {
  const url = `${apiUrl}/courses/`;
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

export async function createCourse({ courseName }) {
  console.log("inside api call", courseName);
  const course = {
    name: `${courseName}`,
    lessons: [],
    authorName: "admin",
    rating: 4.3,
    description: "",
    image: "",
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  const url = `${apiUrl}/courses/new`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(course),
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
