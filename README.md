# React Todo List — 라이브코딩 강의

코드잇 단기심화 과정 지원자 과제 시안을 기반으로 한 React 투두리스트 라이브코딩 자료입니다.
각 단계는 누적 브랜치로 정리되어 있습니다.

- API 문서: https://assignment-todolist-api.vercel.app/docs/
- Figma: https://www.figma.com/design/zcM3VfCNbtiqt5aLhlv4sV/

## 시작하기

```bash
npm install
cp .env.example .env   # VITE_TENANT_ID 설정 확인 (기본 react-todo-live)
npm run dev
```

## 브랜치 구조

| 브랜치      | 이번 단계에 진행할 작업               |
| ----------- | ------------------------------------- |
| `step1`     | 컬러·폰트 셋업                        |
| `step2`     | 리액트 라우터 셋업                    |
| `step3`     | 퍼블리싱 셋업 (반응형 컨테이너)       |
| `step4`     | 공통 컴포넌트 (GNB·Search·CheckList)  |
| `step5`     | Home 페이지 (목록·추가·토글)          |
| `step6`     | Detail 페이지 (상세·수정·이미지·삭제) |
| `reference` | 최종 완성본 (반응형·빈 상태·검증)     |

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

### step3 — 퍼블리싱 셋업

**파일**: `src/components/Layout.module.css`, `src/components/Layout.jsx`

- `Layout.module.css` 생성: `max-width: 1200px` 컨테이너 + 가운데 정렬
- 반응형 padding: 데스크탑 24px, 모바일 16px
- `Layout`의 `<Outlet />`을 `<main className={styles.main}>`으로 감싸기
- 이후 모든 컴포넌트의 `.module.css`에서 동일한 미디어쿼리 패턴이 반복됨

### step4 — 공통 컴포넌트

**파일**: `src/components/GNB/*`, `src/components/Search/*`, `src/components/CheckList/*`, `src/components/Layout.jsx`
GNB만 라이브 시연. 나머지는 간략히 설명하고 넘어감.

### step5 — Home 페이지 (목록·추가·토글)

**파일**: `src/lib/api.js`, `.env`, `.env.example`, `src/pages/Home.jsx`, `src/pages/Home.module.css`

1. **환경 변수 설정**
   - `.env.example` 작성, `.env`에 `VITE_TENANT_ID=react-todo-live` 설정
2. **`src/lib/api.js`** — API 모듈
   - fetch wrapper + Item CRUD: `getItems`, `getItem`, `createItem`, `updateItem`, `deleteItem`
   - 이미지 업로드: `uploadImage(file)` (multipart/form-data) - 생략
3. **`Home.jsx`** 구현
4. **`Home.module.css`** — 디자인 시안 반영

### step6 — Detail 페이지 (상세·수정·이미지·삭제)

**파일**: `src/components/TitleBar/*`, `src/components/ImageUploader/*`, `src/components/MemoBox/*`, `src/components/ActionButtons/*`, `src/pages/Detail.jsx`, `src/pages/Detail.module.css`

1. **Detail 전용 컴포넌트** (미리 작성)
   - **TitleBar**: 체크박스 + 가운데 정렬 제목 인풋, 완료 시 violet-100 배경
   - **ImageUploader**: 미리보기 + 우측 하단 업로드 버튼, file input 클릭 trigger
   - **MemoBox**: `memo.svg` 배경 + 가운데 정렬 textarea
   - **ActionButtons**: 수정 완료(slate-200) / 삭제하기(rose-500)
2. **`Detail.jsx`** 구현
3. **`Detail.module.css`** — 이미지/메모 2열 그리드, 모바일에서 1열

### reference — 최종 완성본
