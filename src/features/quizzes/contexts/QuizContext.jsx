import { useContext, createContext, useReducer, useEffect } from "react";
import { apiUrl } from "../../../services/mongoApi";
import { useParams } from "react-router";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  quizId: null,
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  answers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        quizId: action.payload.quizId,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload.answer,
        answers: [
          ...state.answers,
          {
            questionNumber: action.payload.questionNumber,
            answer: action.payload.answer,
          },
        ],
        points:
          action.payload.answer === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        quizId: state.quizId,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const { id } = useParams();
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      answers,
      quizId,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  useEffect(function () {
    // "https://my-json-server.typicode.com/thanasisxatz1997/FakeServer/questions"
    async function fetchData() {
      await fetch(`${apiUrl}/quizzes/quizById?id=${id}`)
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: "dataReceived",
            payload: { questions: data.questions, quizId: data.id },
          })
        )
        .catch((err) => dispatch({ type: "dataFailed" }));
    }
    fetchData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        answers,
        quizId,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
