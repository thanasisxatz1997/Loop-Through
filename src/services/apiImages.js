import supabase from "./supabase";

export async function getAllImages() {
  const { data, error } = await supabase.storage
    .from("course-images")
    .list("public", {
      limit: 100,
      offset: 0,
    });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  // Filter to get only image files (you can adjust the extensions as needed)
  const images = data.filter(
    (file) =>
      file.name.endsWith(".jpg") ||
      file.name.endsWith(".jpeg") ||
      file.name.endsWith(".jfif") ||
      file.name.endsWith(".png") ||
      file.name.endsWith(".gif")
  );

  return images;
}

export async function getAllImageUrls() {
  const images = await getAllImages();

  const imageUrls = images.map((image) => {
    const { data } = supabase.storage
      .from("course-images")
      .getPublicUrl(`public/${image.name}`);
    return data.publicUrl;
  });
  console.log("HERE");
  console.log(imageUrls);
  return imageUrls;
}
