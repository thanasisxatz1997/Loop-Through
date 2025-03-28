import { apiUrl } from "./mongoApi";

export async function runPythonCodeApi(code) {
  const url = `${apiUrl}/python/run`;

  try {
    const payload = { code };
    console.log("Sending:", payload);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.text();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
