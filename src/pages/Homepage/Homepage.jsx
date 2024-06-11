import ExpenseForm from "@components/ExpenseForm";
import ExpenseListByMonth from "@components/ExpenseListByMonth";
import ExpenseSummaryByMonth from "@components/ExpenseSummaryByMonth";
import MonthlyExpenses from "@components/MonthlyExpenses";
import { useState } from "react";
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

function Homepage() {
  const [filterMonth, setFilterMonth] = useState("");
  return (
    <StrMain>
      <StrSection>
        <ExpenseForm />
      </StrSection>
      <StrSection>
        <MonthlyExpenses setFilterMonth={setFilterMonth} />
      </StrSection>
      <StrSection>
        <ExpenseSummaryByMonth filterMonth={filterMonth} />
      </StrSection>
      <StrSection>
        <ExpenseListByMonth filterMonth={filterMonth} />
      </StrSection>
    </StrMain>
  );
}

export default Homepage;
