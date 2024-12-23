import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import supabase from "../hooks/useSupabase";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<{
  user: User | undefined;
}>({
  user: undefined,
});

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user);

        if (event === "INITIAL_SESSION") {
          // handle initial session
        } else if (event === "SIGNED_IN") {
          console.log("signin callback");
        } else if (event === "SIGNED_OUT") {
          console.log("signout callback");
          navigate("/");
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        }
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
