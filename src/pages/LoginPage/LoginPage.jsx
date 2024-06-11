import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: logIn } = useMutation({
    mutationFn: ({ id, password }) => api.auth.loginUser(id, password),
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: ({ id, password, nickname }) =>
      api.auth.registerUser(id, password, nickname),
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await logIn({
        id: formData.username,
        password: formData.password,
      });

      console.log("Login Response:", response);

      const { accessToken } = response;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      toast.success("로그인 성공");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("로그인 실패");
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사
    if (!formData.username || !formData.password || !formData.name) {
      toast.error("모든 필드를 입력하세요.");
      return;
    }

    // 아이디 유효성 검사
    if (formData.username.length < 4 || formData.username.length > 10) {
      toast.error("아이디는 4~10 글자로 입력하세요.");
      return;
    }

    // 비밀번호 유효성 검사
    if (formData.password.length < 4 || formData.password.length > 15) {
      toast.error("비밀번호는 4~15 글자로 입력하세요.");
      return;
    }

    // 닉네임 유효성 검사
    if (formData.name.length < 1 || formData.name.length > 10) {
      toast.error("닉네임은 1~10 글자로 입력하세요.");
      return;
    }

    try {
      const response = await register({
        id: formData.username,
        password: formData.password,
        nickname: formData.name,
      });

      console.log("Register Response:", response);

      toast.success("회원가입이 완료되었습니다. 이제 로그인해주세요.");
      setIsLogin(true); // 회원가입 완료 후 로그인 폼으로 전환
    } catch (error) {
      console.error("Register Error:", error);
      if (error.response && error.response.status === 409) {
        toast.error("이미 존재하는 사용자 이름입니다. 다른 이름을 사용하세요.");
      } else {
        toast.error("회원가입 실패");
      }
    }
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
          <label className="block text-gray-700 mb-2" htmlFor="username">
            사용자 이름
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="사용자 이름을 입력하세요"
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
