import supabase from "./supabase";

export async function login({ email, password, metadata = {} }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    metadata,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signUp({ email, password, metadata }) {
  console.log("here the data: ", email, password, metadata);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) throw new Error(error.message);
  console.log("signed up! ", data);
  return data;
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
