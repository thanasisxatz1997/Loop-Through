import { apiUrl } from "./mongoApi";

export async function healthCheck() {
  try {
    const response = await fetch(`${apiUrl}/health/check`);
    console.log(response);
    if (response.ok) {
      console.log("Backend is accessible:");
      return true;
    } else {
      console.error("Error connecting to backend. Status:", response.status);
    }
  } catch (error) {
    throw new Error("Error connecting to backend:", error.message);
  }
}
