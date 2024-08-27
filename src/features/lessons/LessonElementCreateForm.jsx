import { useState } from "react";
import SelectionHeader from "../../ui/SelectionHeader";
import ImageCreateEditForm from "./ImageCreateEditForm";
import TitleCreateEditForm from "./TitleCreateEditForm";
import ParagraphCreateEditForm from "./ParagraphCreateEditForm";
import styled from "styled-components";
import { useEditLesson } from "./useEditLesson";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

const StyledContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 3px;
`;

function getNewLessonContent(content, id, create) {
  let newContent = [];
  if (create === "above") {
    newContent = [
      ...newContent,
      ...content.map((item) =>
        item.id < id ? item : { ...item, id: item.id + 1 }
      ),
      { id: id },
    ].sort((a, b) => a.id - b.id);
  } else {
    newContent = [
      ...newContent,
      ...content.map((item) =>
        item.id <= id ? item : { ...item, id: item.id + 1 }
      ),
      { id: id + 1 },
    ].sort((a, b) => a.id - b.id);
  }
  return newContent;
}

function LessonElementCreateForm({
  onCloseModal,
  elementId,
  edit = false,
  lesson,
  create,
  deleteOperation = false,
}) {
  const [editLesson, isEditing] = useEditLesson();
  const tabs = [
    { name: "Title", id: 0 },
    { name: "Paragraph", id: 1 },
    { name: "Image", id: 2 },
    { name: "Other", id: 3 },
  ];
  const newElementId = create === "below" ? elementId + 1 : elementId;

  function onLessonEdited(newElementData) {
    console.log("new el data", newElementData);
    const updatedLessonContent = newLessonContent.map((item) =>
      item.id === newElementId ? { id: newElementId, ...newElementData } : item
    );
    console.log("Updated", updatedLessonContent);
    const enumeratedLessonContent = updatedLessonContent.map((item, i) => ({
      id: i,
      ...item,
    }));
    console.log("enumerated", enumeratedLessonContent);
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
    console.log(updatedLesson);
    editLesson(updatedLesson);
  }

  function deleteLessonElement() {
    console.log("new del data:", lesson.content);
    const contentAfterDelete = lesson.content.filter(
      (item) => item.id !== elementId
    );
    console.log(contentAfterDelete);

    const enumeratedLessonContent = contentAfterDelete
      .slice()
      .map((item, i) => ({
        id: i,
        ...item,
      }));
    console.log("enumerated", enumeratedLessonContent);
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
    console.log(updatedLesson);
    editLesson(updatedLesson);
    onCloseModal();
  }

  const newLessonContent =
    edit === true
      ? lesson.content
      : getNewLessonContent(lesson.content, elementId, create);

  const LessonElementForms = [
    {
      id: 0,
      elem: (
        <TitleCreateEditForm
          startingContent={edit ? lesson.content[elementId - 1] : null}
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
        ></TitleCreateEditForm>
      ),
    },
    {
      id: 1,
      elem: (
        <ParagraphCreateEditForm
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
        ></ParagraphCreateEditForm>
      ),
    },
    {
      id: 2,
      elem: (
        <ImageCreateEditForm
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
        ></ImageCreateEditForm>
      ),
    },
  ];
  const [activeTabId, setActiveTabId] = useState(0);

  if (deleteOperation)
    return (
      <DeleteConfirmation
        onConfirm={deleteLessonElement}
        onCloseModal={onCloseModal}
      ></DeleteConfirmation>
    );

  return (
    <StyledContainer>
      <SelectionHeader
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      ></SelectionHeader>
      {LessonElementForms[activeTabId].elem}
    </StyledContainer>
  );
}

export default LessonElementCreateForm;
