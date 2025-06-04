import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import ToggleSwitch from "../../ui/ToggleSwitch";
import { useEffect, useState } from "react";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEnableCodeEditor } from "./useEnableEditor";
import { useDisableCodeEditor } from "./useDisableCodeEditor";

function AdminCodeEditorPanel() {
  const [checked, setChecked] = useState(false);
  const { settings, isFetchingSettings, error } = useSettings();
  const { enableCodeEditor, isEnablingCodeEditor } = useEnableCodeEditor();
  const { disableCodeEditor, isDisablingCodeEditor } = useDisableCodeEditor();

  useEffect(() => {
    if (settings) {
      setChecked(settings.codeEditorEnabled);
    }
  }, [settings]);

  function handleChangeCheck() {
    if (checked) {
      disableCodeEditor();
    } else {
      enableCodeEditor();
    }
    setChecked((checked) => !checked);
  }

  if (error) return <div>Error</div>;
  if (isFetchingSettings || isDisablingCodeEditor || isEnablingCodeEditor) {
    return (
      <StyledAdminPanelContainer>
        <Spinner></Spinner>
      </StyledAdminPanelContainer>
    );
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
