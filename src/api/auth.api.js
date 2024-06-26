import { EXPENSE_BASE_URL } from "./api";

class AuthAPI {
  #client;

  constructor(client) {
    this.#client = client;
  }

  // 회원가입
  async registerUser(id, password, nickname) {
    const response = await this.#client.post("/register", {
      id,
      password,
      nickname,
    });
    // JSON Server에 데이터 저장 요청
    await this.#client.post(`${EXPENSE_BASE_URL}/userList`, {
      id,
      nickname,
    });

    return response.data;
  }

  // 로그인
  async loginUser(id, password) {
    const response = await this.#client.post("/login?expiresIn=10m", {
      id,
      password,
    });
    return response.data;
  }

  // 회원 정보 조회
  async getUser(accessToken) {
    try {
      const response = await this.#client.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(`Fetching user failed: ${error.message}`);
    }
  }

  // 프로필 이미지 및 닉네임 변경
  async updateProfile(formData, accessToken, userId) {
    const response = await this.#client.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // JSON Server에 데이터 업데이트
    const { nickname } = response.data;

    const existingUsers = await this.#client.get(
      `${EXPENSE_BASE_URL}/userList`
    );
    const user = existingUsers.data.find((user) => user.id === userId);
    await this.#client.patch(`${EXPENSE_BASE_URL}/userList/${user.id}`, {
      nickname,
    });

    return response.data;
  }
}

export default AuthAPI;
