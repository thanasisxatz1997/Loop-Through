import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Quizzes from "./features/quizzes/Quizzes";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Settings from "../src/pages/Settings";
import Courses from "../src/pages/Courses";
import Course from "../src/pages/Course";
import Quiz from "./features/quizzes/components/Quiz";
import User from "./pages/User";
import AboutUs from "./pages/AboutUs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import UserQuizzes from "./features/quizzes/UserQuizzes";
import Login from "./pages/Login";
import EditQuizPage from "./pages/EditQuizPage";
import UserCourses from "./pages/UserCourses";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CodeEditor from "./pages/CodeEditor";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />}></Route>
            <Route path="code-editor" element={<CodeEditor />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="courses" element={<Courses />}></Route>
            <Route path="myCourses" element={<UserCourses />}></Route>
            <Route path="courses/:id" element={<Course />} />
            <Route path="quizes" element={<Quizzes />}></Route>
            <Route path="myQuizzes" element={<UserQuizzes />}></Route>
            <Route path="quizes/:id" element={<Quizzes />} />
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="editQuiz/:id" element={<EditQuizPage />} />
            <Route path="settings" element={<Settings />}></Route>
            <Route path="course/:id" element={<Course />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="info" element={<AboutUs />}></Route>
          </Route>
          <Route element={<AppLayout />}>
            <Route path="login" element={<Login />}></Route>
          </Route>
          <Route element={<AppLayout />}>
            <Route path="admin" element={<AdminPanel />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
