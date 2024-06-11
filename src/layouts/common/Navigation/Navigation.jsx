import { useSelector } from "react-redux";
import LogoutButton from "../../../components/Common/LogoutButton";
import NavigationLinks from "./NavigationLinks";
import UserProfile from "./UserProfile";

function Navigation() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);

  console.log(user, token);
  return (
    <nav className="fixed top-0 z-50 flex justify-between items-center bg-neutral-800 w-full h-16 px-8">
      <NavigationLinks />
      <div className="flex items-center gap-4">
        <UserProfile user={user} />
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navigation;
