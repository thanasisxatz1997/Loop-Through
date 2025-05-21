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
import { HiMiniPlay } from "react-icons/hi2";
import { HiMiniXCircle } from "react-icons/hi2";

const StyledCodeEditorContainer = styled.div`
  /* background-color: var(--bg-color-light-0); */
  /* background-color: #131f2e; */

  height: 100%;
  padding: 3rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */ url("/r31.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function CodeEditor() {
  const [code, setCode] = useState("");
  const { runPythonCode, isRunningPythonCode } = useRunPythonCode();
  const [output, setOutput] = useState("");

  async function handleRunCode(code) {
    const output = await runPythonCode(code);
    setOutput(() => output);
  }
  function handleClear() {
    setCode("");
  }

  return (
    <StyledCodeEditorContainer>
      <Row type="vertical" padding="1rem" gap="0.5rem">
        <CodeMirror
          value={code}
          minHeight="300px"
          height="50vh"
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
          style={{
            minHeight: "150px",
            height: "20vh",
            backgroundColor: "var(--color-grey-100)",
            margin: "0rem",
          }}
        ></StyledFormTextArea>
        <Row style={{ padding: "0.5rem" }} content="start" gap="1rem">
          <Button
            variation="success"
            onClick={() => handleRunCode(code)}
            disabled={isRunningPythonCode}
          >
            <Row content="center" gap="0.5rem">
              Run
              <HiMiniPlay size={20}></HiMiniPlay>
            </Row>
          </Button>
          <Button
            variation="danger"
            onClick={handleClear}
            disabled={isRunningPythonCode}
          >
            <Row content="center" gap="0.5rem">
              Clear
              <HiMiniXCircle size={20}></HiMiniXCircle>
            </Row>
          </Button>
        </Row>
      </Row>
    </StyledCodeEditorContainer>
  );
}

export default CodeEditor;
