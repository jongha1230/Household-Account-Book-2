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
    await this.#client.post("http://localhost:3000/userList", {
      id,
      nickname,
    });

    return response.data;
  }

  // 로그인
  async loginUser(id, password) {
    const response = await this.#client.post("/login", {
      id,
      password,
    });
    return response.data;
  }

  // 회원 정보 조회
  async getUser(accessToken) {
    const response = await this.#client.get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
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
      "http://localhost:3000/userList"
    );
    const user = existingUsers.data.find((user) => user.id === userId);
    await this.#client.patch(`http://localhost:3000/userList/${user.id}`, {
      nickname,
    });

    return response.data;
  }
}

export default AuthAPI;
