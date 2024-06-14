import axios from "axios";
import AuthAPI from "./auth.api";
import ExpenseAPI from "./expense.api";

export const AUTH_BASE_URL = "https://moneyfulpublicpolicy.co.kr/";
export const EXPENSE_BASE_URL = "https://nice-calm-fang.glitch.me";

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
