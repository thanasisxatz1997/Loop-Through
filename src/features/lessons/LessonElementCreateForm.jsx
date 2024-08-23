import { useState } from "react";
import SelectionHeader from "../../ui/SelectionHeader";
import ImageCreateEditForm from "./ImageCreateEditForm";
import TitleCreateEditForm from "./TitleCreateEditForm";
import ParagraphCreateEditForm from "./ParagraphCreateEditForm";
import styled from "styled-components";

const StyledContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 3px;
`;
function LessonElementCreateForm({ onCloseModal }) {
  const tabs = [
    { name: "Title", id: 0 },
    { name: "Paragraph", id: 1 },
    { name: "Image", id: 2 },
    { name: "Other", id: 3 },
  ];
  const LessonElementForms = [
    { id: 0, elem: <TitleCreateEditForm></TitleCreateEditForm> },
    { id: 1, elem: <ParagraphCreateEditForm></ParagraphCreateEditForm> },
    { id: 2, elem: <ImageCreateEditForm></ImageCreateEditForm> },
  ];
  const [activeTabId, setActiveTabId] = useState(0);
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
