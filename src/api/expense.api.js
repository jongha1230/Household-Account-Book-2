class ExpenseAPI {
  #client;

  constructor(client) {
    this.#client = client;
  }

  async getExpenses() {
    try {
      const response = await this.#client.get("/expenses");
      console.log("응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error("지출 데이터를 가져오는 중 오류 발생:", error);
      throw error;
    }
  }

  async getExpenseById(id) {
    try {
      const response = await this.#client.get(`/expenses/${id}`);
      console.log("지출 항목 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error("지출 항목 데이터 가져오는 중 오류 발생:", error);
      throw error;
    }
  }

  async createExpense(expense) {
    try {
      const response = await this.#client.post("/expenses", expense);
      console.log("지출 데이터 생성:", response.data);
      return response.data;
    } catch (error) {
      console.error("지출 데이터 생성 중 오류 발생:", error);
      throw error;
    }
  }

  async updateExpense(id, expense) {
    try {
      const response = await this.#client.patch(`/expenses/${id}`, expense);
      console.log("지출 데이터 수정:", response.data);
      return response.data;
    } catch (error) {
      console.error("지출 데이터 수정 중 오류 발생:", error);
      throw error;
    }
  }

  async deleteExpense(id) {
    try {
      const response = await this.#client.delete(`/expenses/${id}`);
      console.log("지출 데이터 삭제:", response.data);
      return response.data;
    } catch (error) {
      console.error("지출 데이터 삭제 중 오류 발생:", error);
      throw error;
    }
  }
}

export default ExpenseAPI;
