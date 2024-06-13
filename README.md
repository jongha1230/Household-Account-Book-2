## 나만의 가계부

### 프로젝트 개요
이 프로젝트는 개인 가계부 관리 시스템입니다. 사용자는 지출 내역을 추가하고 관리할 수 있으며, Tanstack-Query를 이용하여 실시간으로 지출 데이터를 관리합니다.

### 기능
- 지출 내역 CRUD 
- JWT 토근 인증 로그인

### 기술 스택
- **React**
- **Tanstack-Query**: 지출 내역의 상태 관리를 위한 데이터 fetching 라이브러리입니다.
- **JSON Server**: 로컬에서 가상 REST API 서버를 생성하여 지출 데이터를 저장하고 관리합니다
- **Vercel**: 배포 플랫폼으로 사용되었습니다.

### 설치 및 실행 방법
1. 저장소를 클론합니다. <br />
   <br />
   ```bash
   git clone https://github.com/your-username/household-account-book.git
   cd household-account-book
   ```
  <br />

2. 패키지를 설치합니다. <br />
   <br />
   ```bash
   npm install
   ```
  <br />
  
3. JSON 서버를 시작합니다. 이는 db.json 파일을 사용하여 가상의 REST API 서버를 제공합니다. <br />
   <br />
   ```bash
   npm start
   ```
  <br />

4. 브라우저에서 http://localhost:3000 을 열어 애플리케이션을 확인합니다.
  
### 배포 주소
애플리케이션은 Vercel에 배포되어 있습니다. 아래 링크를 통해 접속할 수 있습니다:
https://household-account-book-sand.vercel.app/
