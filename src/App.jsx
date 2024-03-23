import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Courses from "../src/pages/Courses";
import Quizes from "../src/pages/Quizes";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="courses" element={<Courses />}></Route>
            <Route path="quizes" element={<Quizes />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
