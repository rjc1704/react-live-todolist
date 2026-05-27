# React Todo List — 라이브코딩 강의

코드잇 단기심화 과정 지원자 과제 시안을 기반으로 한 React 투두리스트 라이브코딩 자료입니다. 강의 시간은 총 100분이며 각 단계는 누적 브랜치로 정리되어 있습니다.

- API 문서: https://assignment-todolist-api.vercel.app/docs/
- Figma: https://www.figma.com/design/zcM3VfCNbtiqt5aLhlv4sV/

## 시작하기

```bash
npm install
cp .env.example .env   # VITE_TENANT_ID 설정 확인 (기본 react-todo-live)
npm run dev
```

## 브랜치 구조 (누적)

| 브랜치 | 설명 | 라이브 여부 |
|---|---|---|
| `main` | 강의 시작 전 보존 상태 | — |
| `step1` | 컬러·폰트 셋업 | 라이브 (~5분) |
| `step2` | 리액트 라우터 셋업 | 라이브 (~10분) |
| `step3` | 퍼블리싱 셋업 (반응형 컨테이너) | 일부 시연 (~10분) |
| `step4` | 공통 컴포넌트 (GNB·Search·CheckList) | GNB만 라이브 (~15분) |
| `step5` | Home 페이지 (목록·추가·토글) | 라이브 (~30분) |
| `step6` | Detail 페이지 (상세·수정·이미지·삭제) | 라이브 (~25분) |
| `reference` | 최종 완성본 (반응형·빈 상태·검증) | — |

각 step 브랜치는 이전 step까지의 작업이 모두 포함된 누적 상태입니다. 학생이 따라오지 못한 경우 다음 step 브랜치로 점프하면 그때까지의 결과물을 모두 가지고 시작할 수 있습니다.

```bash
git checkout step1      # 1단계 완료 시점부터 시작
git checkout step5      # 1~5단계 누적 결과부터 시작
git checkout reference  # 최종 완성본
```

## 단계별 작업 내용

### step1 — 컬러·폰트 셋업

**파일**: `src/index.css`, `src/styles/reset.css`

- `:root`에 디자인 토큰을 CSS 변수로 정의
  - slate (900/800/500/400/300/200/100), violet (600/100), rose 500, lime 300, green 700, amber 800
- Eric Meyer reset 적용 (`reset.css` 임포트)
- `box-sizing: border-box` 글로벌 적용
- `body` 폰트: `"NanumSquareNeo"`
- 태블릿(`max-width: 1199px`), 모바일(`max-width: 743px`) 미디어쿼리 빈 패턴 작성

### step2 — 리액트 라우터 셋업

**파일**: `src/main.jsx`, `src/App.jsx`, `src/components/Layout.jsx`, `src/pages/Home.jsx`, `src/pages/Detail.jsx`

1. `npm install react-router`
2. `main.jsx`에서 `<App />`을 `<BrowserRouter>`로 래핑
3. `App.jsx`에 라우트 정의
   - `/` → `Home`
   - `/:id` → `Detail`
   - 공통 `Layout`으로 래핑
4. `Layout`은 일단 `<Outlet />`만 렌더하는 최소 형태
5. `Home`/`Detail`은 `<div>Home</div>`, `<div>Detail</div>` 빈 stub

### step3 — 퍼블리싱 셋업

**파일**: `src/components/Layout.module.css`, `src/components/Layout.jsx`

- `Layout.module.css` 생성: `max-width: 1200px` 컨테이너 + 가운데 정렬
- 반응형 padding: 데스크탑 24px, 모바일 16px
- `Layout`의 `<Outlet />`을 `<main className={styles.main}>`으로 감싸기
- 이후 모든 컴포넌트의 `.module.css`에서 동일한 미디어쿼리 패턴이 반복됨

### step4 — 공통 컴포넌트

**파일**: `src/components/GNB/*`, `src/components/Search/*`, `src/components/CheckList/*`, `src/components/Layout.jsx`

1. `npm install react-responsive`
2. **GNB (라이브 시연)**
   - `useMediaQuery({ maxWidth: 743 })`로 모바일 여부 판별
   - 로고 이미지 분기 (`logo-lg.svg` ↔ `logo-sm.svg`)
   - `.module.css`로 스코프된 스타일, 1200px 컨테이너 + 반응형 padding
   - `<Link to="/">`로 홈 이동
3. **Search (미리 작성)**
   - controlled input (`value`, `onChange`, `onAdd` props)
   - 추가 버튼: 입력값 없으면 `plus-vacant` + slate-200 / 있으면 `plus` + lime-300
   - 모바일에서는 아이콘만 (글씨 숨김)
4. **CheckList (미리 작성)**
   - 체크박스 + `<Link to={`/${id}`}>`로 상세 페이지 이동
   - 완료 시 violet-100 배경 + `line-through`
   - 체크박스 클릭 시 부모로 `onToggle(id, !isCompleted)` 콜백
5. `Layout`에 `<GNB />` 합류

### step5 — Home 페이지 (목록·추가·토글)

**파일**: `src/lib/api.js`, `.env`, `.env.example`, `src/pages/Home.jsx`, `src/pages/Home.module.css`

1. **환경 변수 설정**
   - `.env.example` 작성, `.env`에 `VITE_TENANT_ID=react-todo-live` 설정
2. **`src/lib/api.js`** — API 모듈
   - fetch wrapper + Item CRUD: `getItems`, `getItem`, `createItem`, `updateItem`, `deleteItem`
   - 이미지 업로드: `uploadImage(file)` (multipart/form-data)
3. **`Home.jsx`** 구현
   - `useState`로 items, inputValue 관리
   - `useEffect`로 초기 GET
   - 추가(POST): `onAdd` → `createItem` → 상태에 append + input 초기화
   - 토글(PATCH): `onToggle(id, isCompleted)` → `updateItem` → 상태 갱신
   - `isCompleted` 기준으로 **TO DO** / **DONE** 두 섹션으로 분리 렌더
4. **`Home.module.css`** — 디자인 시안 반영
   - TO DO 라벨: lime-300 배경, green-700 글씨
   - DONE 라벨: green-700 배경, lime-300 글씨
   - 데스크탑 2열 그리드 (`grid-template-columns: 1fr 1fr`)
   - 태블릿/모바일에서 1열

### step6 — Detail 페이지 (상세·수정·이미지·삭제)

**파일**: `src/components/TitleBar/*`, `src/components/ImageUploader/*`, `src/components/MemoBox/*`, `src/components/ActionButtons/*`, `src/pages/Detail.jsx`, `src/pages/Detail.module.css`

1. **Detail 전용 컴포넌트** (미리 작성)
   - **TitleBar**: 체크박스 + 가운데 정렬 제목 인풋, 완료 시 violet-100 배경
   - **ImageUploader**: 미리보기 + 우측 하단 업로드 버튼, file input 클릭 trigger
   - **MemoBox**: `memo.svg` 배경 + 가운데 정렬 textarea
   - **ActionButtons**: 수정 완료(slate-200) / 삭제하기(rose-500)
2. **`Detail.jsx`** 구현
   - `useParams()`로 id 가져옴
   - `useEffect`로 단일 GET → 로컬 상태로 보관
   - 모든 필드 controlled (name/memo/imageUrl/isCompleted)
   - 이미지 업로드: file input change → `uploadImage(file)` → 반환된 url을 imageUrl에 set
   - 수정 완료: `updateItem` → `navigate("/")`
   - 삭제하기: `deleteItem` → `navigate("/")`
3. **`Detail.module.css`** — 이미지/메모 2열 그리드, 모바일에서 1열

### reference — 최종 완성본

step6 위에 다음을 추가합니다.

- **폰트 CDN**: `index.css`에 NanumSquareNeo 웹폰트 import, body 배경/색상 베이스
- **빈 상태 UI**: TO DO/DONE 비어있을 때 일러스트(`todo-lg/sm`, `done-lg/sm`) + 안내 문구
  - `useMediaQuery`로 모바일은 `-sm` SVG 사용
- **이미지 업로드 검증**: 5MB 초과 / 한글 파일명 검증 후 alert
- **반응형 디테일**: ActionButtons 모바일에서 가운데 정렬

## 사용 라이브러리

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| react | 19 | UI 라이브러리 |
| react-router | 7 | SPA 라우팅 |
| react-responsive | 10 | 미디어 쿼리 훅 |
| vite | 8 | 빌드 도구 |

## 디자인 토큰

| 변수 | 값 | 용도 |
|---|---|---|
| `--color-slate-100` ~ `900` | grayscale | 배경, 보더, 본문 텍스트 |
| `--color-violet-600` | `#7c3aed` | 로고 |
| `--color-violet-100` | `#ede9fe` | 체크 완료 시 배경 |
| `--color-rose-500` | `#f43f5e` | 삭제 버튼 |
| `--color-lime-300` | `#bef264` | 활성 버튼, DONE 라벨 글씨 |
| `--color-green-700` | `#15803d` | TO DO 글씨, DONE 배경 |
| `--color-amber-800` | `#92400e` | Memo 라벨 |
