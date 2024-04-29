import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Quizes from "../src/pages/Quizes";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Settings from "../src/pages/Settings";
import Courses from "../src/pages/Courses";
import Course from "../src/pages/Course";
import Quiz from "./features/quizes/components/Quiz";
import User from "./pages/User";
import AboutUs from "./pages/AboutUs";

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
            <Route path="quizes/:id" element={<Quizes />} />
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="settings" element={<Settings />}></Route>
            <Route path="course/:id" element={<Course />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="info" element={<AboutUs />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
