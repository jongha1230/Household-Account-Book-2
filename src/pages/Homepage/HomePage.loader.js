import api from "../../api/api";

export const HomePageLoader = async () => {
  try {
    const data = await api.expense.getExpenses();
    return { expenses: data };
  } catch (error) {
    throw new Error("Failed to load expenses data");
  }
};
