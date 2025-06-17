import { useState } from "react";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import Button from "../../styles/StyledButton";
import StyledFormTextInput from "../../styles/StyledFormTextInput";

function CreateRoleForm({ handleAddRole, onCloseModal }) {
  const [roleName, setRoleName] = useState("");

  return (
    <Row type="vertical" gap="1rem" padding="1rem">
      <Heading as="h2">New Role:</Heading>
      <StyledFormTextInput
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      ></StyledFormTextInput>
      <Row margin="1rem 0rem">
        <Button
          variation="success"
          onClick={() => {
            handleAddRole(roleName);
            onCloseModal();
          }}
        >
          Create
        </Button>
        <Button variation="danger" onClick={onCloseModal}>
          Cancel
        </Button>
      </Row>
    </Row>
  );
}

export default CreateRoleForm;
