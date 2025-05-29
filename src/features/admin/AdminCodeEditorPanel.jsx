import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import ToggleSwitch from "../../ui/ToggleSwitch";
import { useState } from "react";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";

function AdminCodeEditorPanel() {
  const [checked, setChecked] = useState(false);

  function handleChangeCheck() {
    setChecked((checked) => !checked);
  }
  return (
    <StyledAdminPanelContainer>
      <Row type="vertical">
        <Heading as="h2">Code Editor</Heading>
        <Row content="start" gap="2rem" style={{ alignItems: "center" }}>
          <Heading as="h3">Enabled: </Heading>
          <ToggleSwitch
            checked={checked}
            onChange={handleChangeCheck}
          ></ToggleSwitch>
        </Row>
      </Row>
    </StyledAdminPanelContainer>
  );
}

export default AdminCodeEditorPanel;
