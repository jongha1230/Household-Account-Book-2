import { AlertModal } from "@components/Modal";
import { addExpense } from "@redux/slices/fetchedDataSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import useExpenseForm from "../../hooks/useExpenseForm";
import { StrForm } from "./ExpenseForm.styled";

function ExpenseForm() {
  const initialExpense = { date: "", item: "", amount: "", description: "" };
  const {
    expense,
    setExpense,
    handleInputChange,
    handleFormSubmit,
    isAlertModalOpen,
    alertMessage,
    closeAlertModal,
  } = useExpenseForm(initialExpense, onSubmit);

  const dateInputRef = useRef(null);
  const dispatch = useDispatch();

  function onSubmit(newExpense) {
    dispatch(addExpense({ id: uuidv4(), ...newExpense }));
    toast.success("등록되었습니다.");
    setExpense(initialExpense);
  }

  return (
    <>
      <StrForm onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="date">날짜</label>
          <input
            ref={dateInputRef}
            type="text"
            id="date"
            name="date"
            placeholder="YYYY-MM-DD"
            value={expense.date}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            name="item"
            placeholder="지출 항목"
            value={expense.item}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0"
            value={expense.amount}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="지출 내용"
            value={expense.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">저장</button>
      </StrForm>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => dispatch(closeAlertModal())}
        message={alertMessage}
      />
    </>
  );
}

export default ExpenseForm;
