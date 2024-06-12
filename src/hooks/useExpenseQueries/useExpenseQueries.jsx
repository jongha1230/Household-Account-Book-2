import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetExpenses = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await api.expense.getExpenses();
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["expenses"]),
  });
};

export const useExpenseDetail = (itemId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["expenseDetail", itemId],
    queryFn: async () => {
      const data = await api.expense.getExpenseById(itemId);
      return data;
    },
    onSuccess: (data) =>
      queryClient.invalidateQueries(["expenseDetail", itemId], data),
    enabled: !!itemId,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExpense) => {
      const data = await api.expense.createExpense(newExpense);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["expenses"]),
    onError: (error) => {
      console.error("Error creating expense:", error);
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, updatedExpense }) => {
      const data = await api.expense.updateExpense(itemId, updatedExpense);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
    onError: (error) => {
      console.error("Error updating expense:", error);
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseId) => {
      const data = await api.expense.deleteExpense(expenseId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["expense"]),
    onError: (error) => {
      console.error("Error deleting expense:", error);
    },
  });
};
