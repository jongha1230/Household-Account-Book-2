import dateValidator from "@components/dateValidator";
import { closeAlertModal, openAlertModal } from "@redux/slices/modalSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useExpenseForm = (initialExpense, onSubmit) => {
  const [expense, setExpense] = useState(initialExpense);
  const dispatch = useDispatch();
  const { isAlertModalOpen, alertMessage } = useSelector(
    (state) => state.modal
  );
  const user = useSelector((state) => state.auth.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { date, item, amount, description } = expense;

    if (!date || !item || !amount || !description) {
      dispatch(openAlertModal("입력창을 모두 작성해주세요."));
      return;
    }

    const dateValidationError = dateValidator(date);
    if (dateValidationError) {
      dispatch(openAlertModal(dateValidationError));
      return;
    }

    onSubmit({
      ...expense,
      amount: parseFloat(amount),
      createdBy: user.nickname,
    });
  };

  return {
    expense,
    setExpense,
    handleInputChange,
    handleFormSubmit,
    isAlertModalOpen,
    alertMessage,
    closeAlertModal: () => dispatch(closeAlertModal()),
  };
};

export default useExpenseForm;
