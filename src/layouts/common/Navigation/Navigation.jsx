import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../../../components/Common/LogoutButton";
import NavigationLinks from "./NavigationLinks";
import UserProfile from "./UserProfile";

const Navigation = React.memo(() => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="fixed top-0 z-50 flex justify-between items-center bg-neutral-800 w-full h-16 px-8">
      <NavigationLinks />
      <div className="flex items-center gap-4">
        <UserProfile user={user} />
        <LogoutButton />
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
