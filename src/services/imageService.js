import supabase, { supabaseUrl } from "./supabase";

export async function uploadImage(image) {
  try {
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/lesson-images/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from("lesson-images")
      .upload(imageName, image);
    if (storageError) {
      console.log("Storage error: ");
      console.log(storageError);
      return null;
    }
    return { imagePath: imagePath, imageName: imageName };
  } catch (error) {
    console.log("Error while uploading image. ", error.message);
    return null;
  }
}

export async function deleteImage(imageName) {
  try {
    console.log("trying to delete image with name: ", imageName);
    const { data, error } = await supabase.storage
      .from("lesson-images")
      .remove(imageName);
    if (error) {
      console.log("Error while deleting image. ", error.message);
    } else {
      console.log("Image deleted from bucket.");
    }
  } catch (error) {
    console.log("Error while deleting image. ", error.message);
  }
}

export async function deleteLessonImage(userId, courseId, lessonId, imageName) {
  try {
    console.log("userId: ", userId);
    console.log("courseId: ", courseId);
    console.log("lessonId: ", lessonId);
    console.log("trying to delete image with name: ", imageName);
    const { data1, error1 } = await supabase.storage
      .from(`lesson-images`)
      .list();
    console.log(data1);
    const { data, error } = await supabase.storage
      .from(`lesson-images`)
      .remove(`${userId}/${courseId}/${lessonId}/${imageName}`);
    if (error) {
      console.log("Error while deleting image. ", error.message);
    } else {
      console.log("Image deleted from bucket.");
    }
  } catch (error) {
    console.log("Error while deleting image. ", error.message);
  }
}

export async function uploadLessonImage(userId, courseId, lessonId, image) {
  try {
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/lesson-images/${userId}/${courseId}/${lessonId}/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from(`lesson-images/${userId}/${courseId}/${lessonId}`)
      .upload(imageName, image);
    if (storageError) {
      console.log("Storage error: ");
      console.log(storageError);
      return null;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //A SECOND WAY TO HANDLE AUTHORIZED DELETION OF IMAGES, MIGHT TRY IT
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const { data, error: dbError } = await supabase.from("images").insert([
    //   {
    //     image_path: imagePath,
    //     user_id: userId,
    //     created_at: new Date().toISOString(),
    //   },
    // ]);

    // if (dbError) {
    //   console.error("Database error: ", dbError);
    //   return null;
    // }
    // console.log("inserted: ", data);
    return { imagePath: imagePath, imageName: imageName };
  } catch (error) {
    console.log("Error while uploading image. ", error.message);
    return null;
  }
}
