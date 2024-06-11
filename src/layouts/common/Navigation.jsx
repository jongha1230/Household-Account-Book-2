import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profileDefaultImg from "../../assets/default-profile.jpg";
import { logOut } from "../../redux/slices/authSlice";

function Navigation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 flex justify-between items-center bg-neutral-800 w-full h-16 px-8">
      <div className="flex gap-4">
        <Link to="/" className="text-white decoration-inherit no-underline">
          HOME
        </Link>
        <Link
          to="mypage"
          className="text-white decoration-inherit no-underline"
        >
          내 프로필
        </Link>
      </div>
      <div className="flex items-center gap-4 text-white">
        <img
          className="rounded-full w-10 h-10 object-cover"
          src={user.avatar ?? profileDefaultImg}
          alt="user_image"
        />
        <span>{user.nickname ?? "닉네임"}</span>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
