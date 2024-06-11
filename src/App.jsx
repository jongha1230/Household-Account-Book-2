import { logInSuccess } from "@redux/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import api from "api/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import QueryProvider from "./query/QueryProvider";
import router from "./routes/router.jsx";

const fetchUser = async (token) => {
  const response = await api.auth.getUser(token);
  return response.data;
};

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  const { data } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    onError: (error) => {
      console.error("Error fetching user:", error);
    },
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("accessToken");
    }
    if (data) {
      dispatch(logInSuccess({ accessToken: token, user: data }));
    }
  }, [token, data, dispatch]);

  return (
    <QueryProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryProvider>
  );
}

export default App;
