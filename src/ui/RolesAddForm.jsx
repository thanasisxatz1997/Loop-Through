import styled from "styled-components";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";
import { HiMiniPlus, HiNoSymbol } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useState } from "react";

const StyledTagsContainer = styled.div`
  /* min-height: 60vh; */
  display: flex;
  flex-direction: column;
  min-height: 250px;
  max-height: 70vh;
  overflow: auto;
  flex-grow: 1;
  gap: 10px;
`;

const StyledSelectListContainer = styled.div`
  min-height: 20px;
  max-height: 50vh;
  height: 50vh;
  overflow: auto;
  margin: 10px;
  width: 50vh;
  max-width: 50vh;
`;

const TagRow = styled(Row)`
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TagsDisplayRow = styled(Row)`
  flex-wrap: wrap;
  gap: 5px;
  max-width: 100%;
`;

function RollesAddForm({
  usedRoles,
  onCloseModal,
  handleSaveRoles,
  allRoles,
  item,
}) {
  const [searchText, setSearchText] = useState("");
  const [editedRoles, setEditedRoles] = useState(usedRoles);

  console.log("allroles: ", allRoles);
  const displayedRoles = allRoles.filter(
    (role) =>
      role.toLowerCase().startsWith(searchText.toLowerCase()) &&
      !editedRoles.includes(role)
  );

  function handleSave(editedRoles) {
    handleSaveRoles(item, editedRoles);
    onCloseModal();
  }
  return (
    <StyledTagsContainer>
      <Row>
        <Heading>Add roles:</Heading>
        <SearchBar
          border="2px solid var(--color-brand-500)"
          placeholder="Search roles"
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchBar>
      </Row>

      <StyledSelectListContainer>
        <Row type="vertical">
          {displayedRoles.map((tag) => (
            <TagRow content="start" gap="5px" key={tag}>
              <Heading as="h3">{tag}</Heading>
              <Button
                size="small"
                onClick={() => setEditedRoles([...editedRoles, tag])}
              >
                <HiMiniPlus size={20}></HiMiniPlus>
              </Button>
            </TagRow>
          ))}
        </Row>
      </StyledSelectListContainer>

      <TagsDisplayRow gap="5px" content="start">
        <Heading as="h2">Roles:</Heading>
        {editedRoles.map((tag) => (
          <Button
            key={tag}
            size="small"
            variation="danger"
            onClick={() =>
              setEditedRoles(editedRoles.filter((item) => item !== tag))
            }
          >
            <Row gap="5px">
              <Heading as="h4">{tag}</Heading>
              <HiNoSymbol size={20}></HiNoSymbol>
            </Row>
          </Button>
        ))}
      </TagsDisplayRow>

      <Row>
        <Button variation="success" onClick={() => handleSave(editedRoles)}>
          Save
        </Button>
        <Button variation="danger" onClick={onCloseModal}>
          Cancel
        </Button>
      </Row>
    </StyledTagsContainer>
  );
}

export default RollesAddForm;
