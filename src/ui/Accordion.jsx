import "./accordionStyles.css";
import { useState } from "react";
const faqs = [
  {
    title: "What is the purpose of our site?",
    text: "The purpose of our platform, Stark Gript, is to provide an engaging and supportive environment for learning programming and tech-related topics. We guide learners from foundational concepts through interactive lectures, quizzes to test understanding, and even a code editor to practice in real time. Whether you're a beginner or looking to sharpen your skills, our goal is to help you learn effectively and confidently.",
  },
  {
    title: "How can i optimize my learning process?",
    text: "To get the most out of your learning experience on our platform start with the lectures to build your foundational knowledge. Practice regularly using the built-in code editor. Take quizzes to reinforce what you've learned and identify areas for improvement. Don’t hesitate to ask for help—our authors are available for support if you get stuck or need clarification. Review your progress and revisit topics as needed. Consistency and active engagement are key to mastering new skills!",
  },
  {
    title: "Is it possible to make my own courses?",
    text: "Yes, absolutely! Our platform allows users to create and publish their own courses. Whether you want to share your expertise, build a learning path for others, or contribute to the community, you can design your own lectures, quizzes, and materials. Get started by visiting the course creation section in your user dashboard.",
  },
];

// function App() {
//   return (
//     <div>
//       <Accordion data={faqs} />
//     </div>
//   );
// }

export default function Accordion({ data = faqs }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={i}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;
  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
