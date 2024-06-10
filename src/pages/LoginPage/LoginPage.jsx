import { useState } from "react";
import { toast } from "react-toastify";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log("로그인 정보:", {
      username: formData.username,
      password: formData.password,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("모든 필드를 입력하세요.");
      return;
    }
    // 회원가입 처리 로직 추가
    console.log("회원가입 정보:", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setIsLogin(true); // 회원가입 완료 후 로그인 폼으로 전환
    toast.success("회원가입이 완료되었습니다. 이제 로그인해주세요.");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col gap-2.5 bg-white p-8 rounded w-96 h-100"
        onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
      >
        <h2 className="text-2xl mb-6 text-center">
          {isLogin ? "로그인" : "회원가입"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="이름을 입력하세요"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            {isLogin ? "이메일 또는 사용자 이름" : "이메일"}
          </label>
          <input
            type="text"
            id={isLogin ? "username" : "email"}
            name={isLogin ? "username" : "email"}
            value={isLogin ? formData.username : formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={
              isLogin
                ? "이메일 또는 사용자 이름을 입력하세요"
                : "이메일을 입력하세요"
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            isLogin
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLogin ? "로그인" : "회원가입"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className={`w-full p-2 rounded text-white ${
            isLogin
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLogin ? "회원가입" : "로그인"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
