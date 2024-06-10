import { createBrowserRouter } from "react-router-dom";
import ExpenseDetail from "../pages/ExpenseDetail";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/expenses/:itemId",
    element: <ExpenseDetail />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
