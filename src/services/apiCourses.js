import { getAuthToken } from "./apiAuth";
import { getLessonsByCourseId } from "./apiLessons";
import { apiUrl } from "./mongoApi";
import supabase, { supabaseUrl } from "./supabase";

export async function getCourses() {
  const url = `${apiUrl}/courses/`;
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

export async function getCoursesByAuthorId(authorId) {
  const url = `${apiUrl}/courses/coursesByAuthorId?authorId=${authorId}`;
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

export async function createCourse(newCourse) {
  const token = getAuthToken();
  const imageName = `${Math.random()}-${newCourse.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/course-images/${newCourse.authorId}/${imageName}`;
  //https://nyznsssttvpdlhzugabm.supabase.co/storage/v1/object/public/course-images/bapi%20extra%20dependency%20to%20remove.png
  // 1. Creating a course

  const course = {
    name: newCourse.name,
    authorId: newCourse.authorId,
    lessons: [],
    authorName: newCourse.authorName,
    rating: 4.3,
    description: newCourse.description,
    image: imagePath,
    tags: newCourse.tags ? newCourse.tags : [],
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
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

    // 2. Upload image
    const { error: storageError } = await supabase.storage
      .from(`course-images/${newCourse.authorId}`)
      .upload(imageName, newCourse.image);

    // 3. Maybe delete course if there was an error uploading image

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateCourse(course) {
  const token = getAuthToken();
  const courseBody = {
    name: `${course.name}`,
    lessons: course.lessons,
    description: course.description,
    image: course.image,
    rating: course.rating,
    tags: course.tags,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/courses/updateCourseById?id=${course.id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(courseBody),
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

export async function deleteCourseRequest(courseId) {
  const token = getAuthToken();
  const url = `${apiUrl}/courses/deleteCourseById?id=${courseId}`;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
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
