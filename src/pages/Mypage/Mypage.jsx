import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
import { updateUser } from "../../redux/slices/authSlice";

function Mypage() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nickname: user?.nickname || "",
    avatar: user?.avatar || null,
  });

  // form data 변경
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "avatar" ? files[0] : value,
    }));
  };

  // 프로필 업데이트
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (formData) => {
      return api.auth.updateProfile(formData, token, user.id);
    },
    onSuccess: (data) => {
      dispatch(updateUser(data));
      queryClient.invalidateQueries(["user", token]); // 쿼리 초기화
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 업데이트 오류:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="flex justify-center h-screen">
      <form
        className="flex flex-col content-around gap-4 bg-white p-8 rounded-lg shadow-md w-96 h-[350px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">프로필 수정</h2>
        <div>
          <label htmlFor="nickname" className="text-lg font-medium mb-1">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="avatar" className="text-lg font-medium mb-1">
            이미지
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "등록 중..." : "등록"}
        </button>
      </form>
    </div>
  );
}

export default Mypage;
