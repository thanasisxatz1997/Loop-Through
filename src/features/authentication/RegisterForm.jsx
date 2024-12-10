import styled from "styled-components";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledButton from "../../styles/StyledButton";
import { useSignUp } from "./useSignUp";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLogin } from "./useLogin";

const StyledSignInForm = styled.form`
  background-color: var(--color-grey-100);
  padding: 3rem;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 5px 8px 12px 0px var(--color-grey-700);
`;

const StyledFormLabel = styled.label`
  margin-right: 5px;
`;
const StyledFormTextInput = styled.input``;
function RegisterForm() {
  const { signUp, isLoading } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");

  function handleLogin(e) {
    const metadata = { username: username };
    e.preventDefault();
    console.log("trying to sign up with: ", email, password, passwordCheck);
    if (password !== passwordCheck) {
      toast.error("The passwords do not match.");
    } else {
      signUp({ email, password, metadata });
    }
  }

  return (
    <StyledSignInForm>
      <Heading textalign="center">Register!</Heading>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Username:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          placeholder=" Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Email:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          placeholder=" email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Password:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          type="password"
          placeholder=" ********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Retype Password:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          type="password"
          placeholder=" ********"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row>
        <StyledButton onClick={(e) => handleLogin(e)}>Register</StyledButton>
      </Row>
    </StyledSignInForm>
  );
}

export default RegisterForm;
