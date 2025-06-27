import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";
import { useAllUsers } from "./useAllUsers";
import Spinner from "../../ui/Spinner";
import RollesAddForm from "../../ui/RolesAddForm";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { HiMiniPlus } from "react-icons/hi2";
import Button from "../../styles/StyledButton";
import Modal from "../../ui/Modal";
import { changeUserRoles } from "../../services/apiUsers";
import RegisterForm from "../authentication/RegisterForm";

function AdminUsersPanel({ settings }) {
  const { users, isFetchingUsers, error } = useAllUsers();

  const currentRoles = settings?.roles;

  if (error) return <StyledAdminPanelContainer></StyledAdminPanelContainer>;
  if (isFetchingUsers) {
    return <Spinner></Spinner>;
  }
  return (
    <StyledAdminPanelContainer>
      <Modal>
        <Row type="vertical">
          <Heading as="h2">Users</Heading>
        </Row>
        {users.map((user) => (
          <Row type="vertical" key={user.id} gap="1px">
            <Row gap="1rem" content="start" style={{ alignItems: "end" }}>
              <Heading as="h4">{user.userName}</Heading>
              email: {user.email}
            </Row>
            <Row content="start" gap="1rem" style={{ paddingLeft: "4rem" }}>
              <Heading as="h4">Roles:</Heading>
              <Row gap="1rem">
                {user.roles.map((role) => (
                  <div>{role}</div>
                ))}
              </Row>
              <Modal.Window name="rolesAddModal">
                <RollesAddForm
                  usedRoles={user.roles}
                  handleSaveRoles={changeUserRoles}
                  allRoles={currentRoles}
                  item={user}
                ></RollesAddForm>
              </Modal.Window>
              <Modal.Open opens="rolesAddModal" fun={(e) => e.preventDefault()}>
                <Button size="small">
                  <Row>
                    Manage Roles
                    <HiMiniPencilSquare size={15}></HiMiniPencilSquare>
                  </Row>
                </Button>
              </Modal.Open>
            </Row>
            <hr></hr>
          </Row>
        ))}
        <Row content="center" style={{ marginTop: "10px" }}>
          <Modal.Open opens="registerFormModal" fun={(e) => e.preventDefault()}>
            <Button size="small">
              <Row style={{ alignItems: "center" }}>
                <HiMiniPlus size={20}></HiMiniPlus>New User
              </Row>
            </Button>
          </Modal.Open>
        </Row>
        <Modal.Window name="registerFormModal" transparent="true">
          <RegisterForm></RegisterForm>
        </Modal.Window>
      </Modal>
    </StyledAdminPanelContainer>
  );
}

export default AdminUsersPanel;
