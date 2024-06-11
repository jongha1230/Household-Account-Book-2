import { createBrowserRouter } from "react-router-dom";
import ExpenseDetail from "../pages/ExpenseDetail";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Homepage />
      </PrivateRoute>
    ),
  },
  {
    path: "/expenses/:itemId",
    element: (
      <PrivateRoute>
        <ExpenseDetail />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
