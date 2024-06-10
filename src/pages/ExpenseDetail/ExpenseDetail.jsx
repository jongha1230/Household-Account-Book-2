import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AlertModal, ConfirmModal } from "@components/Modal";
import { removeExpense, updateExpense } from "@redux/slices/fetchedDataSlice";
import { closeConfirmModal, openConfirmModal } from "@redux/slices/modalSlice";
import useExpenseDetail from "../../hooks/useExpenseDetail";

import { useRef } from "react";
import { toast } from "react-toastify";
import useExpenseForm from "../../hooks/useExpenseForm";
import { StrForm } from "./ExpenseDetail.styled";

function ExpenseDetail() {
  const { itemId } = useParams();
  const originalExpense = useExpenseDetail(itemId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isConfirmModalOpen } = useSelector((state) => state.modal);

  const {
    expense,
    handleInputChange,
    handleFormSubmit,
    isAlertModalOpen,
    alertMessage,
    closeAlertModal,
  } = useExpenseForm(originalExpense, onSubmit);

  const dateRef = useRef(null);
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  function onSubmit(modifiedExpense) {
    dispatch(updateExpense(modifiedExpense));
    toast.success("수정이 완료되었습니다.");
    navigate("/");
  }

  const handleDelete = () => {
    dispatch(openConfirmModal());
  };

  const handleConfirmDelete = () => {
    dispatch(removeExpense(originalExpense));
    dispatch(closeConfirmModal());
    toast.warn("삭제 되었습니다.");
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="main-container">
      <StrForm onSubmit={handleFormSubmit}>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          name="date"
          defaultValue={expense.date}
          placeholder="YYYY-MM-DD"
          ref={dateRef}
          onChange={handleInputChange}
        />
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          name="item"
          defaultValue={expense.item}
          placeholder="지출 항목"
          ref={itemRef}
        />
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          name="amount"
          defaultValue={expense.amount}
          placeholder="0"
          ref={amountRef}
        />
        <label htmlFor="item">내용</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={expense.description}
          placeholder="지출 내용"
          ref={descriptionRef}
        />
        <div>
          <button type="submit" className="edit-btn">
            수정
          </button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
          <button type="button" className="back-btn" onClick={handleGoBack}>
            뒤로가기
          </button>
        </div>
      </StrForm>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => dispatch(closeConfirmModal())}
        onConfirm={handleConfirmDelete}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => dispatch(closeAlertModal())}
        message={alertMessage}
      />
    </div>
  );
}

export default ExpenseDetail;
