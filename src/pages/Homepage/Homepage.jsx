import ExpenseForm from "@components/ExpenseForm";
import ExpenseListByMonth from "@components/ExpenseListByMonth";
import ExpenseSummaryByMonth from "@components/ExpenseSummaryByMonth";
import MonthlyExpenses from "@components/MonthlyExpenses";
import React, { useState } from "react";
import styled from "styled-components";

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
  const [filterMonth, setFilterMonth] = useState("");
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
        <MemoizedExpenseListByMonth filterMonth={filterMonth} />
      </StrSection>
    </StrMain>
  );
}

export default Homepage;
