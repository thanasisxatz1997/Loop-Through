import { useState } from "react";
import SelectionHeader from "../../ui/SelectionHeader";
import ImageCreateEditForm from "./ImageCreateEditForm";
import TitleCreateEditForm from "./TitleCreateEditForm";
import ParagraphCreateEditForm from "./ParagraphCreateEditForm";
import styled from "styled-components";
import { useEditLesson } from "./useEditLesson";
import DeleteConfirmation from "../../ui/DeleteConfirmation";
import { deleteLessonImage } from "../../services/imageService";
import { useUser } from "../authentication/useUser";
import QuizLinkCreateEditForm from "./QuizLinkCreateEditForm";

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
  const tabEnumeration = [
    { type: "t", key: 0 },
    { type: "p", key: 1 },
    { type: "i", key: 2 },
    { type: "o", key: 3 },
  ];
  console.log("ElementId: ", elementId);
  const [editLesson, isEditing] = useEditLesson();
  const { user, isPending, isAuthenticated, isFetching } = useUser();
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
    { name: "Quiz link", id: 3 },
  ];
  const newElementId = create === "below" ? elementId + 1 : elementId;
  console.log("create here: ", create, "newElementId: ", newElementId);

  function onLessonEdited(newElementData) {
    const updatedLessonContent = newLessonContent.map((item) =>
      item.id === newElementId ? { id: newElementId, ...newElementData } : item
    );
    const enumeratedLessonContent = updatedLessonContent.map((item, i) => ({
      id: i,
      ...item,
    }));
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
    editLesson(updatedLesson);
  }

  function deleteLessonElement() {
    const itemToDelete = lesson.content.find((item) => item.id === elementId);
    if (itemToDelete.type === "i") {
      deleteLessonImage(
        user.id,
        lesson.courseId,
        lesson.id,
        itemToDelete.imageName
      );
    }
    const contentAfterDelete = lesson.content.filter(
      (item) => item.id !== elementId
    );

    const enumeratedLessonContent = contentAfterDelete.map((item, i) => ({
      ...item,
      id: i + 1,
    }));
    const updatedLesson = { ...lesson, content: enumeratedLessonContent };
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
          lesson={lesson}
        ></ImageCreateEditForm>
      ),
    },
    {
      id: 3,
      elem: (
        <QuizLinkCreateEditForm
          startingContent={startingContent}
          onCloseModal={onCloseModal}
          onLessonEdited={onLessonEdited}
          isEditing={isEditing}
        ></QuizLinkCreateEditForm>
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
