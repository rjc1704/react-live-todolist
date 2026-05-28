import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;
