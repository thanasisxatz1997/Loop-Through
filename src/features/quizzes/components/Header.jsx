import Heading from "../../../styles/Heading";
import { useQuiz } from "../contexts/QuizContext";

function Header() {
  const { quizName } = useQuiz();
  console.log("NAME:!!!", quizName);
  return (
    <header>
      <Heading as="h1" textalign="center">
        {quizName}
      </Heading>
    </header>
  );
}

export default Header;
