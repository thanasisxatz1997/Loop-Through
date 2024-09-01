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
        item.id < id ? item : { ...item, id: Number(item.id) + 1 }
      ),
      { id: Number(id) },
    ].sort((a, b) => a.id - b.id);
  } else {
    newContent = [
      ...newContent,
      ...content.map((item) =>
        item.id <= id ? item : { ...item, id: Number(item.id) + 1 }
      ),
      { id: Number(id) + 1 },
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
  console.log("elementId:", elementId);
  const tabEnumeration = [
    { type: "t", key: 0 },
    { type: "p", key: 1 },
    { type: "i", key: 2 },
    { type: "o", key: 3 },
  ];
  const [editLesson, isEditing] = useEditLesson();
  const startingType = edit
    ? lesson.content.find((item) => item.id === elementId).type
    : "t";
  const startingTab = tabEnumeration.find(
    (item) => item.type === startingType
  ).key;
  const [activeTabId, setActiveTabId] = useState(startingTab);
  const tabs = [
    { name: "Title", id: 0 },
    { name: "Paragraph", id: 1 },
    { name: "Image", id: 2 },
    { name: "Other", id: 3 },
  ];
  const newElementId = create === "below" ? elementId + 1 : elementId;

  function onLessonEdited(newElementData) {
    console.log("New lesson content:", newLessonContent);
    const updatedLessonContent = newLessonContent.map((item) =>
      item.id === newElementId ? { id: newElementId, ...newElementData } : item
    );
    console.log("Updated:", updatedLessonContent);
    const enumeratedLessonContent = updatedLessonContent.map((item, i) => ({
      id: i,
      ...item,
    }));
    console.log("Enumerated:", enumeratedLessonContent);
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
    editLesson(updatedLesson);
  }

  function deleteLessonElement() {
    const contentAfterDelete = lesson.content.filter(
      (item) => item.id !== elementId
    );
    console.log(contentAfterDelete);

    const enumeratedLessonContent = contentAfterDelete.map((item, i) => ({
      ...item,
      id: i + 1,
    }));
    console.log(enumeratedLessonContent);
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
    console.log(updatedLesson);
    editLesson(updatedLesson);
    onCloseModal();
  }

  const newLessonContent =
    edit === true
      ? lesson.content
      : getNewLessonContent(lesson.content, elementId, create);

  const startingContent =
    edit && startingTab === activeTabId ? lesson.content[elementId - 1] : null;
  const LessonElementForms = [
    {
      id: 0,
      elem: (
        <TitleCreateEditForm
          startingContent={startingContent}
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
          isEditing={isEditing}
        ></TitleCreateEditForm>
      ),
    },
    {
      id: 1,
      elem: (
        <ParagraphCreateEditForm
          startingContent={startingContent}
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
          isEditing={isEditing}
        ></ParagraphCreateEditForm>
      ),
    },
    {
      id: 2,
      elem: (
        <ImageCreateEditForm
          startingContent={startingContent}
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
          isEditing={isEditing}
        ></ImageCreateEditForm>
      ),
    },
  ];

  if (deleteOperation)
    return (
      <DeleteConfirmation
        onConfirm={deleteLessonElement}
        onCloseModal={onCloseModal}
        isDeleting={isEditing}
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
