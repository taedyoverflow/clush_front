# Clush ToDo Application - Frontend

## 프로젝트 설명
이 프로젝트는 Clush 개발자 채용 과제를 위해 React.js와 Ant Design을 사용하여 개발된 **할 일(ToDo) 관리 애플리케이션**입니다.  
기본 CRUD 기능 외에도 작업 완료 상태를 관리하고 완료된 작업만 필터링하여 표시할 수 있는 추가적인 기능을 제공합니다.  
백엔드와 연동하여 데이터는 실시간으로 업데이트되며, UI는 Ant Design을 사용해 직관적이고 깔끔하게 구성했습니다.

---

## 주요 기능
1. **할 일 관리 (CRUD)**:
   - 작업(Task)의 생성(Create), 조회(Read), 수정(Update), 삭제(Delete) 기능.
2. **추가 기능**:
   - 작업 완료 상태 업데이트.
   - 완료된 작업만 필터링하여 보기.
3. **사용자 친화적 UI**:
   - Ant Design을 활용하여 직관적이고 반응형 UI 제공.
   - 작업 상태를 시각적으로 구분(우선순위 색상 표시).

---

## 1. 개발한 앱에 대한 설명

### 기술 스택
- **Frontend**: React.js **(v19)**
- **UI Framework**: Ant Design (v4)
- **HTTP Client**: Axios
- **Backend API**: Spring Boot 기반 REST API
- **State Management**: React Hooks (`useState`, `useEffect`)

### 주요 목표
- 사용자 친화적인 UI/UX를 통해 작업 관리를 효율적으로 수행.
- 백엔드와의 완벽한 데이터 연동을 통해 작업 상태 실시간 반영.
- 확장 가능성과 유지보수를 고려한 구조 설계.

---

## 2. 소스 빌드 및 실행 방법 메뉴얼

### 프로젝트 클론 및 의존성 설치
1. 프로젝트 클론:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
2. 의존성 설치:
    ```bash
    npm install
    ```

### 프로젝트 실행
1. 개발 서버 실행:
    ```bash
    npm start
    ```
2. 브라우저에서 `http://localhost:3000`으로 접속.

---

## 3. 주력으로 사용한 컴포넌트에 대한 설명 및 사용 이유

### 주요 컴포넌트
1. **Table (Ant Design)**:
   - 작업(Task) 목록을 테이블 형식으로 표시.
   - `columns`와 `dataSource` 속성을 활용하여 데이터 렌더링.
   - 정렬 및 필터링을 적용하기 쉬운 구조 제공.

2. **Modal (Ant Design)**:
   - 작업(Task)을 추가하거나 수정할 때 팝업 형식의 UI를 제공.
   - `Form`과 연동하여 입력 데이터를 관리.

3. **Form (Ant Design)**:
   - 작업(Task) 데이터를 입력하거나 수정할 때 사용.
   - `Form.Item`의 유효성 검사 기능을 통해 필수 입력값 체크.

4. **Checkbox (Ant Design)**:
   - 작업(Task)의 완료 상태를 시각적으로 나타내고, 클릭하여 상태를 변경.

5. **Message (Ant Design)**:
   - 작업 성공 또는 실패 시 사용자에게 알림을 제공.

---

## 4. 추가 기능

1. **완료 상태 관리**:
   - **기능**: 작업(Task)의 완료 상태를 `true`(완료) 또는 `false`(미완료)로 업데이트.
   - **구현 방식**: 백엔드의 `PUT /api/tasks/{id}/complete` API와 연동.
   - **사용자 경험 강화**: 체크박스를 통해 직관적으로 상태 변경 가능.

2. **완료된 작업 보기**:
   - **기능**: 완료된 작업(Task)만 필터링하여 목록에 표시.
   - **구현 방식**: 백엔드의 `GET /api/tasks/completed` API와 연동.
   - **사용자 경험 강화**: 체크박스를 통해 완료된 작업만 간편하게 필터링.

---

## 스크린샷
### 메인 화면
![Main Screen](https://github.com/taedyoverflow/clush_back/blob/master/img/front.png?raw=true)

### 완료된 작업 필터링
![Completed Tasks](https://github.com/taedyoverflow/clush_back/blob/master/img/front2.png?raw=true)

---

## 백엔드 연동
이 프로젝트는 Spring Boot로 구현된 백엔드 API와 연동됩니다.  
백엔드 프로젝트와의 통합 작업은 [ToDo API Backend](https://github.com/taedyoverflow/clush_back)에서 확인할 수 있습니다.
