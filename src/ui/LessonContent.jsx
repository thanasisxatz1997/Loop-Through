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
import { HiMiniPlusCircle } from "react-icons/hi2";
import Button from "../styles/StyledButton";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDeleteLesson } from "../features/lessons/useDeleteLesson";
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
  margin: 10px 0px;
  ${(props) => css`
    border: ${props.border};
  `}
`;

Container.defaultProps = {
  border: "none",
};

const StyledLessonElementCreateButton = styled.button`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: solid 1px;
  background-color: var(--color-grey-50);
`;

function LessonContent({ lesson }) {
  const [hoveredId, setHoveredId] = useState("");
  const [lastHoveredId, setLastHoveredId] = useState("");
  const [deleteLesson, isDeleting] = useDeleteLesson();
  const activeContentElements = lesson.content;

  return (
    <Row type="vertical">
      <Row content="center" gap="10px">
        <LessonTitle
          title={`This is lesson number ${lesson.lessonNumber}`}
        ></LessonTitle>
        <Row>
          <Modal.Open opens="deleteLessonConfirmationModal">
            <Button variation="danger" size="small">
              <HiArchiveBoxXMark size={20} />
            </Button>
          </Modal.Open>
        </Row>
      </Row>
      <StyledLessonContent>
        <Menus>
          {activeContentElements.map((element) => (
            <Container
              key={element.id}
              onMouseEnter={() => {
                setLastHoveredId(element.id);
                setHoveredId(element.id);
              }}
              onMouseLeave={() => {
                setHoveredId("");
              }}
              border={hoveredId === element.id && "1px dashed  #000000;"}
            >
              <LessonElement element={element}></LessonElement>

              <FloatingDiv display="block">
                <Menus.Menu>
                  {hoveredId === element.id && <Menus.Toggle id={element.id} />}
                  <Menus.List id={element.id}>
                    <Modal.Open opens="lessonElementModalCreateAbove">
                      <Menus.Button>Create Above</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="lessonElementModalCreateBelow">
                      <Menus.Button>Create Below</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="lessonElementModalEdit">
                      <Menus.Button>Edit</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="deleteConfirmationModal">
                      <Menus.Button>Delete</Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                </Menus.Menu>
              </FloatingDiv>
            </Container>
          ))}
        </Menus>
        <Row content="center">
          <Modal.Open opens="lessonElementModalCreateBelow">
            <StyledLessonElementCreateButton>
              <HiMiniPlusCircle size={25} />
            </StyledLessonElementCreateButton>
          </Modal.Open>
        </Row>
        <Modal.Window name="lessonElementModalCreateAbove">
          <LessonElementCreateForm
            elementId={lastHoveredId}
            lesson={lesson}
            create="above"
          ></LessonElementCreateForm>
        </Modal.Window>
        <Modal.Window name="lessonElementModalCreateBelow">
          <LessonElementCreateForm
            elementId={lastHoveredId ? lastHoveredId : 0}
            lesson={lesson}
            create="below"
          ></LessonElementCreateForm>
        </Modal.Window>
        <Modal.Window name="lessonElementModalEdit">
          <LessonElementCreateForm
            elementId={lastHoveredId}
            edit={true}
            lesson={lesson}
          ></LessonElementCreateForm>
        </Modal.Window>
        <Modal.Window name="deleteConfirmationModal">
          <LessonElementCreateForm
            elementId={lastHoveredId}
            lesson={lesson}
            deleteOperation={true}
          ></LessonElementCreateForm>
        </Modal.Window>
        <Modal.Window name="deleteLessonConfirmationModal">
          <DeleteConfirmation
            onConfirm={() => deleteLesson(lesson.id)}
            isDeleting={isDeleting}
          ></DeleteConfirmation>
        </Modal.Window>
      </StyledLessonContent>
      <LessonQuizesContainer quizes={[]}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
