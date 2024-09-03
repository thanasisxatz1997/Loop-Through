import "./accordionStyles.css";
import { useState } from "react";
const faqs = [
  {
    title: "What is the purpose of our site?",
    component: <h1>Component</h1>,
  },
  {
    title: "How can i optimize my learning process?",
    component: <h1>Component</h1>,
  },
  {
    title: "Is it possible to make my own courses?",
    component: <h1>Component</h1>,
  },
];

// function App() {
//   return (
//     <div>
//       <Accordion data={faqs} />
//     </div>
//   );
// }

export default function FormsAccordion({ data = faqs, children }) {
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
          {el.component}
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
