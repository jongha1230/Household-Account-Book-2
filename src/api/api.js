import axios from "axios";
import AuthAPI from "./auth.api";
import ExpenseAPI from "./expense.api";

const AUTH_BASE_URL = "https://moneyfulpublicpolicy.co.kr/";
const EXPENSE_BASE_URL = "http://localhost:3000";

class API {
  #authBaseURL = AUTH_BASE_URL;
  #expenseBaseURL = EXPENSE_BASE_URL;
  #authClient;
  #expenseClient;

  auth;
  expense;

  constructor() {
    this.#authClient = axios.create({ baseURL: this.#authBaseURL });
    this.#expenseClient = axios.create({ baseURL: this.#expenseBaseURL });

    this.auth = new AuthAPI(this.#authClient);
    this.expense = new ExpenseAPI(this.#expenseClient);
  }
}

const api = new API();
export default api;
