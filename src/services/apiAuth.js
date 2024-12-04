import toast from "react-hot-toast";
import supabase from "./supabase";
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
    console.log("here the data: ", email, password, metadata);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    console.log("signed up! ", data);
    return data;
  } catch (healthError) {
    console.log("error", healthError.message);
    throw new Error("Could not connect to back end", healthError.message);
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  console.log(
    "inside useUser: auth:",
    data.user?.role === "authenticated",
    "user:",
    data.user
  );

  return data?.user;
}
