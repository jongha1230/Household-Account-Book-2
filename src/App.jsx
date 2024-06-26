import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import GlobalStyle from "./GlobalStyle";
import api from "./api/api";
import { logInSuccess, logOut } from "./redux/slices/authSlice";
import router from "./routes/router.jsx";

const fetchUser = async (token) => {
  try {
    const response = await api.auth.getUser(token);
    return response;
  } catch (error) {
    if (error.message === "Unauthorized") {
      return undefined;
    }
    throw error;
  }
};

function App() {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auth.accessToken) ??
    localStorage.getItem("accessToken");

  const { data, error } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    onError: (error) => {
      console.error("Error fetching user:", error);
      if (error.message === "Unauthorized") {
        dispatch(logOut());
      }
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(logInSuccess({ accessToken: token, user: data }));
    } else if (error) {
      console.error(error);
      dispatch(logOut());
    }
  }, [token, data, dispatch, error]);

  return (
    <>
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
    </>
  );
}

export default App;
