import ExpenseForm from "@components/ExpenseForm";
import ExpenseListByMonth from "@components/ExpenseListByMonth";
import ExpenseSummaryByMonth from "@components/ExpenseSummaryByMonth";
import MonthlyExpenses from "@components/MonthlyExpenses";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const StrMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StrSection = styled.section`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
`;

const MemoizedExpenseForm = React.memo(ExpenseForm);
const MemoizedMonthlyExpenses = React.memo(MonthlyExpenses);
const MemoizedExpenseSummaryByMonth = React.memo(ExpenseSummaryByMonth);
const MemoizedExpenseListByMonth = React.memo(ExpenseListByMonth);

function Homepage() {
  const { expenses } = useLoaderData();
  const [filterMonth, setFilterMonth] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.expense.getExpenses();
      return response;
    },
    initialData: expenses,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>expenses 로딩중 에러 발생: {error.message}</div>;
  }

  return (
    <StrMain>
      <StrSection>
        <MemoizedExpenseForm />
      </StrSection>
      <StrSection>
        <MemoizedMonthlyExpenses setFilterMonth={setFilterMonth} />
      </StrSection>
      <StrSection>
        <MemoizedExpenseSummaryByMonth filterMonth={filterMonth} />
      </StrSection>
      <StrSection>
        <MemoizedExpenseListByMonth expenses={data} filterMonth={filterMonth} />
      </StrSection>
    </StrMain>
  );
}

export default Homepage;
