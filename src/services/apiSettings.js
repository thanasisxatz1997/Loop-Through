import { getAuthToken } from "./apiAuth";
import { apiUrl } from "./mongoApi";

export async function isAdminRequest() {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/settings/isAdmin`;
  try {
    const response = await fetch(url, { headers: reqHeaders });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getSettings() {
  const url = `${apiUrl}/settings/settings`;
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

export async function changeRolesRequest(roles) {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/settings/roles`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(roles),
      headers: reqHeaders,
    });
    if (!response.ok) {
      console.log("response not ok throwing error");
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("on chatch error");
    throw new Error(`Error while changing roles.`);
  }
}

export async function enableCodeEditorRequest() {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/settings/enableCodeEditor`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response;
    return data;
  } catch (error) {
    throw new Error(`Error while enabling editor.`);
  }
}

export async function disableCodeEditorRequest() {
  const token = getAuthToken();
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const url = `${apiUrl}/settings/disableCodeEditor`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: reqHeaders,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response;
    return data;
  } catch (error) {
    throw new Error(`Error while disabling editor.`);
  }
}
