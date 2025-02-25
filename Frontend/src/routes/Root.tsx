import { Outlet } from "react-router-dom";
import { AuthDialog } from "../components/AuthDialog";
import AppNavbar from "../components/AppNavbar";
import { UserProvider } from "../contexts/AuthContext";

export default function Main() {
  return (
    <UserProvider>
      <div className="mx-auto w-full">
        <AuthDialog />
        <AppNavbar />
        <Outlet />
      </div>
    </UserProvider>
  );
}
