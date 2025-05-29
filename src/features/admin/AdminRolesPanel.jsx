import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";

function AdminRolesPanel() {
  return (
    <StyledAdminPanelContainer>
      <Row type="vertical">
        <Heading as="h2">Roles</Heading>
      </Row>
    </StyledAdminPanelContainer>
  );
}

export default AdminRolesPanel;
