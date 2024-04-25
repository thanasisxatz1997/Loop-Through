import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Courses from "../src/pages/Courses";
import Quizes from "../src/pages/Quizes";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Settings from "../src/pages/Settings";
import Course from "./features/courses/Course";
import Quiz from "./features/quizes/Quiz";

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
            <Route path="courses/:id" element={<Course />} />
            <Route path="quizes" element={<Quizes />}></Route>
            <Route path="quizes/:id" element={<Quiz />} />
            <Route path="settings" element={<Settings />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
