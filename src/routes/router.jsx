import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ExpenseDetail from "../pages/ExpenseDetail";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Mypage from "../pages/Mypage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "mypage",
            element: <Mypage />,
          },
          {
            path: "/expenses/:itemId",
            element: <ExpenseDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
