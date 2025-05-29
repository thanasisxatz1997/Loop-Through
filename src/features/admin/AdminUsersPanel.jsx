import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";

function AdminUsersPanel() {
  return (
    <StyledAdminPanelContainer>
      <Row type="vertical">
        <Heading as="h2">Users</Heading>
      </Row>
    </StyledAdminPanelContainer>
  );
}

export default AdminUsersPanel;
