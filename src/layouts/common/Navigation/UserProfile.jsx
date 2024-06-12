import profileDefaultImg from "../../../assets/default-profile.jpg";

function UserProfile({ user }) {
  return (
    <div className="flex items-center gap-4 text-white">
      <img
        className="rounded-full w-10 h-10 object-cover"
        src={user?.avatar ?? profileDefaultImg}
        alt="user_image"
      />
      <span>{user?.nickname ?? "닉네임"}</span>
    </div>
  );
}

export default UserProfile;
