import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AlertModal, ConfirmModal } from "@components/Modal";
import { closeConfirmModal, openConfirmModal } from "@redux/slices/modalSlice";

import { useEffect } from "react";
import { toast } from "react-toastify";
import useExpenseDetailForm from "../../hooks/useExpenseDetailForm";
import {
  useDeleteExpense,
  useExpenseDetail,
  useUpdateExpense,
} from "../../hooks/useExpenseQueries/useExpenseQueries";
import { StrForm } from "./ExpenseDetail.styled";

function ExpenseDetail() {
  const { itemId } = useParams();
  const { data: initialExpense, isLoading, error } = useExpenseDetail(itemId);
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense } = useDeleteExpense();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isConfirmModalOpen } = useSelector((state) => state.modal);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!itemId) {
      toast.error("잘못된 접근입니다.");
      navigate("/");
    }
  }, [itemId, navigate]);

  const {
    expense,
    handleInputChange,
    handleFormSubmit,
    isAlertModalOpen,
    alertMessage,
    closeAlertModal,
  } = useExpenseDetailForm(initialExpense, onSubmit);

  function onSubmit(modifiedExpense) {
    if (initialExpense.userId === user.id) {
      updateExpense(
        { itemId, updatedExpense: modifiedExpense },
        {
          onSuccess: () => {
            toast.success("수정이 완료되었습니다.");
            navigate("/");
          },
          onError: (error) => {
            toast.error("수정 실패: " + error.message);
          },
        }
      );
    }
  }

  const handleDelete = () => {
    if (initialExpense.userId === user.id) {
      dispatch(openConfirmModal());
    }
  };

  const handleConfirmDelete = () => {
    deleteExpense(itemId);
    dispatch(closeConfirmModal());
    toast.warn("삭제 되었습니다.");
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error)
    return <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>;
  const isOwner = initialExpense.userId === user.id;

  return (
    <div className="main-container">
      <StrForm onSubmit={handleFormSubmit}>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          name="date"
          value={expense.date}
          placeholder="YYYY-MM-DD"
          onChange={handleInputChange}
          disabled={!isOwner}
        />
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          name="item"
          value={expense.item}
          placeholder="지출 항목"
          onChange={handleInputChange}
          disabled={!isOwner}
        />
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          placeholder="0"
          onChange={handleInputChange}
          disabled={!isOwner}
        />
        <label htmlFor="item">내용</label>
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          placeholder="지출 내용"
          onChange={handleInputChange}
          disabled={!isOwner}
        />
        <div>
          {isOwner ? (
            <>
              <button type="submit" className="edit-btn">
                수정
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          ) : null}

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
