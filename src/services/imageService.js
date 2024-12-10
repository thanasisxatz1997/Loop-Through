import supabase, { supabaseUrl } from "./supabase";

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
