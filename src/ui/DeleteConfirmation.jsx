import Heading from "../styles/Heading";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";

function DeleteConfirmation({ onConfirm, onCloseModal }) {
  function handleConfirm() {
    onConfirm();
    onCloseModal();
  }
  return (
    <div>
      <Row margin="20px 0px">
        <Heading as="h2">Are you sure you want to delete?</Heading>
      </Row>
      <Row gap="5px" content="center">
        <Button variation="Danger" onClick={handleConfirm}>
          Delete
        </Button>
        <Button variation="primary" onClick={onCloseModal}>
          Cancel
        </Button>
      </Row>
    </div>
  );
}

export default DeleteConfirmation;
