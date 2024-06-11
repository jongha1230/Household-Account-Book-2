import axios from "axios";
import AuthAPI from "./auth.api";
import ExpenseAPI from "./expense.api";

const BASE_URL = "https://moneyfulpublicpolicy.co.kr/";

class API {
  #baseURL = BASE_URL;
  #client;

  auth;
  expense;

  constructor() {
    this.#client = axios.create({ baseURL: this.#baseURL });

    this.auth = new AuthAPI(this.#client);
    this.expense = new ExpenseAPI(this.#client);
  }
}

const api = new API();
export default api;
