import dateValidator from "@components/dateValidator";
import { closeAlertModal, openAlertModal } from "@redux/slices/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const useExpenseCreateForm = (initialExpense, onSubmit) => {
  const [expense, setExpense] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { isAlertModalOpen, alertMessage } = useSelector(
    (state) => state.modal
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (initialExpense) {
      setExpense({
        date: initialExpense.date || "",
        item: initialExpense.item || "",
        amount: initialExpense.amount || "",
        description: initialExpense.description || "",
      });
    }
  }, [initialExpense]);

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
      id: initialExpense.id || uuidv4(),
      ...expense,
      amount: parseFloat(amount),
      createdBy: user.nickname,
      userId: user.id,
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

export default useExpenseCreateForm;
