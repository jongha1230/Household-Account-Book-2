import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <div className="flex gap-4">
      <Link to="/" className="text-white decoration-inherit no-underline">
        HOME
      </Link>
      <Link to="/mypage" className="text-white decoration-inherit no-underline">
        내 프로필
      </Link>
    </div>
  );
}

export default NavigationLinks;
