import StyledLessonContent from "../styles/StyledLessonContent";
import LessonTitle from "./LessonTitle";
import Row from "../styles/Row";
import LessonQuizesContainer from "../ui/LessonQuizesContainer";
import LessonElement from "../services/LessonElement";
import Menus from "./Menus";
import styled, { css } from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import LessonElementCreateForm from "../features/lessons/LessonElementCreateForm";
import CreateCourseForm from "../features/courses/CreateCourseForm";

const FloatingDiv = styled.div`
  top: 0px;
  right: 10px;
  position: absolute;
  ${(props) => css`
    display: ${props.display};
  `}
`;

FloatingDiv.defaultProps = {
  display: "none",
  border: "none",
};

const Container = styled.div`
  position: relative;
  padding-bottom: 1px;

  ${(props) => css`
    border: ${props.border};
  `}
`;

Container.defaultProps = {
  border: "none",
};

function LessonContent({ lesson }) {
  const [hoveredId, setHoveredId] = useState("");
  const activeContentElements = lesson.content;
  return (
    <Row type="vertical">
      <LessonTitle
        title={`This is lesson number ${lesson.lessonNumber}`}
      ></LessonTitle>
      <StyledLessonContent>
        <Menus>
          {activeContentElements.map((element) => (
            <Container
              key={element.id}
              onMouseEnter={() => setHoveredId(element.id)}
              onMouseLeave={() => setHoveredId("")}
              border={hoveredId === element.id && "1px dashed  #000000;"}
            >
              <LessonElement key={element.id} element={element}></LessonElement>

              <FloatingDiv display="block">
                <Menus.Menu>
                  {hoveredId === element.id && <Menus.Toggle id={element.id} />}
                  <Menus.List id={element.id}>
                    <Modal.Open opens="lessonElementModal">
                      <Menus.Button>Create Above</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="lessonElementModal2">
                      <Menus.Button>Create Below</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="lessonElementModal3">
                      <Menus.Button>Edit</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="lessonElementModal4">
                      <Menus.Button>Delete</Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                </Menus.Menu>
              </FloatingDiv>
            </Container>
          ))}
        </Menus>
        <Modal.Window name="lessonElementModal">
          <LessonElementCreateForm
          // createCourse={() => console.log("aaa")}
          ></LessonElementCreateForm>
        </Modal.Window>
      </StyledLessonContent>
      <LessonQuizesContainer quizes={[]}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
