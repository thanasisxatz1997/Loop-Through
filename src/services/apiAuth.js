import toast from "react-hot-toast";
import supabase, { supabaseProject } from "./supabase";
import { createUser } from "./apiUsers";
import { healthCheck } from "./apiCheck";

export async function login({ email, password, metadata = {} }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    metadata,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Error while trying to log out. ", error.message);
    throw new Error(error.message);
  } else {
    toast.success("Logged out successfully!");
    return true;
  }
}

export async function signUp({ email, password, metadata }) {
  try {
    await healthCheck();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    await createUser(data.user.id, data.user.user_metadata.username);
    return data;
  } catch (healthError) {
    throw new Error("Could not connect to back end", healthError.message);
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export function getAuthToken() {
  const storedData = localStorage.getItem(`sb-${supabaseProject}-auth-token`);

  if (!storedData) {
    console.warn("No auth token found in localStorage.");
    return null;
  }

  try {
    const parsedData = JSON.parse(storedData);
    return parsedData.access_token || null;
  } catch (error) {
    console.error("Error parsing auth token:", error);
    return null;
  }
}
