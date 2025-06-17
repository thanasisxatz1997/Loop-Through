import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import {
  HiMiniPlusCircle,
  HiMiniTrash,
  HiNoSymbol,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import Button from "../../styles/StyledButton";
import Modal from "../../ui/Modal";
import CreateRoleForm from "./CreateRoleForm";
import { useChangeRoles } from "./useChangeRoles";

function AdminRolesPanel() {
  const { settings, isFetchingSettings } = useSettings();
  const [editedRoles, setEditedRoles] = useState([]);
  const { changeRoles, isChangingRoles } = useChangeRoles();
  const currentRoles = settings?.roles;
  const isEditing = editedRoles !== currentRoles;

  function handleAddRole(newRole) {
    setEditedRoles([...editedRoles, newRole]);
  }

  function handleDeleteRole(roleToDelete) {
    setEditedRoles(editedRoles.filter((role) => role !== roleToDelete));
  }

  function handleSave() {
    const newRoles = { roles: editedRoles };
    changeRoles(newRoles);
  }
  useEffect(() => {
    if (settings) {
      setEditedRoles(settings.roles);
    }
  }, [settings]);

  if (isFetchingSettings || isChangingRoles)
    return (
      <StyledAdminPanelContainer>
        <Spinner></Spinner>
      </StyledAdminPanelContainer>
    );
  return (
    <Modal>
      <StyledAdminPanelContainer>
        <Row type="vertical">
          <Heading as="h2">Roles</Heading>
        </Row>
        {editedRoles.map((role) => (
          <Row type="vertical" key={role} gap="1px">
            <Row type="horizontal">
              <Heading as="h4">{role}</Heading>
              <Row gap="2rem">
                <Button
                  variation="danger"
                  size="small"
                  onClick={() => handleDeleteRole(role)}
                >
                  <Row gap="5px">
                    Delete
                    <HiMiniTrash size={15}></HiMiniTrash>
                  </Row>
                </Button>
              </Row>
            </Row>
            <hr></hr>
          </Row>
        ))}
        <Modal.Open opens="newQuizModal">
          <Row content="center">
            <Button variation="transparent" size="small" shadow="none">
              <Row gap="5px">
                <Heading as="h5">New Role</Heading>
                <HiMiniPlusCircle size={20}></HiMiniPlusCircle>
              </Row>
            </Button>
          </Row>
        </Modal.Open>
        <Modal.Window name="newQuizModal">
          <CreateRoleForm handleAddRole={handleAddRole}></CreateRoleForm>
        </Modal.Window>
        <Row padding="2rem" content="start" gap="1rem">
          <Button
            variation="success"
            disabled={!isEditing}
            onClick={handleSave}
          >
            <Row gap="5px">
              Save
              <HiOutlineCheckCircle size={20}></HiOutlineCheckCircle>
            </Row>
          </Button>
          <Button>
            <Row gap="5px">
              Cancel
              <HiNoSymbol size={20}></HiNoSymbol>
            </Row>
          </Button>
        </Row>
      </StyledAdminPanelContainer>
    </Modal>
  );
}

export default AdminRolesPanel;
