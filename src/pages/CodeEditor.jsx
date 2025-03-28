import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";
import { useState } from "react";
import { useRunPythonCode } from "../hooks/useRunPythonCode";
import toast from "react-hot-toast";
import Heading from "../styles/Heading";
import StyledFormTextArea from "../styles/StyledFormTextArea";
import styled from "styled-components";

const StyledCodeEditorContainer = styled.div`
  background-color: var(--bg-color-light-0);
  /* background-color: #131f2e; */

  height: 100%;
  padding: 3rem;
`;

function CodeEditor() {
  const [code, setCode] = useState("");
  const { runPythonCode, isRunningPythonCode } = useRunPythonCode();
  const [output, setOutput] = useState("");

  async function handleRunCode(code) {
    const output = await runPythonCode(code);
    setOutput(() => output);
  }

  return (
    <StyledCodeEditorContainer>
      <Row type="vertical" padding="1rem">
        <CodeMirror
          value={code}
          height="300px"
          padding={10}
          onChange={(code) => setCode(code)}
          style={{
            fontFamily: "monospace",
            fontSize: 17,
            border: "1px solid black",
          }}
          theme={vscodeDark}
          disabled={isRunningPythonCode}
        />
        <Heading as="h3">Code output:</Heading>
        <StyledFormTextArea
          value={output}
          disabled
          style={{ height: "150px" }}
        ></StyledFormTextArea>
        <Row style={{ padding: "1rem" }}>
          <Button
            variation="success"
            onClick={() => handleRunCode(code)}
            disabled={isRunningPythonCode}
          >
            Run
          </Button>
        </Row>
      </Row>
    </StyledCodeEditorContainer>
  );
}

export default CodeEditor;
