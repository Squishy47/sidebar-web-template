import { useMutation } from "@tanstack/react-query";
import supabase from "./useSupabase";

async function signout() {
  console.log("signout");

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export function useSignout() {
  return useMutation({
    mutationFn: () => signout(),
    onSuccess: () => {
      console.log("signed out.");
    },
  });
}
