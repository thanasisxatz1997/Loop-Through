import styled from "styled-components";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledButton from "../../styles/StyledButton";
import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

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

const StyledHref = styled.a`
  color: blue;
`;

function SignInForm() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onError: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <StyledSignInForm onSubmit={handleSubmit}>
      <Heading textalign="center">Sign in!</Heading>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Username/Email:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          disabled={isLoading}
          placeholder=" Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Password:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
          disabled={isLoading}
          type="password"
          placeholder=" ********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem" content="end">
        <StyledHref href="/">Forgot your password?</StyledHref>
      </Row>
      <Row>
        <StyledButton disabled={isLoading}>
          {!isLoading ? "Sign In" : <SpinnerMini></SpinnerMini>}
        </StyledButton>
      </Row>
    </StyledSignInForm>
  );
}

export default SignInForm;
