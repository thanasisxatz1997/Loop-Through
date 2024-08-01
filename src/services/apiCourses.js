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
    console.log("at response data: ", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createCourse({
  courseName,
  courseDescription = "",
  courseImage,
}) {
  const imageName = `${Math.random()}-${courseImage.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/course-images/${imageName}`;
  //https://nyznsssttvpdlhzugabm.supabase.co/storage/v1/object/public/course-images/bapi%20extra%20dependency%20to%20remove.png
  // 1. Creating a course
  console.log("inside api call", courseName);
  const course = {
    name: `${courseName}`,
    lessons: [],
    authorName: "admin",
    rating: 4.3,
    description: courseDescription,
    image: imagePath,
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

    // 2. Upload image
    const { error: storageError } = await supabase.storage
      .from("course-images")
      .upload(imageName, courseImage);

    // 3. Maybe delete course if there was an error uploading image

    return data;
  } catch (error) {
    console.log(error.message);
  }
}
