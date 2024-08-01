import styled from "styled-components";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledButton from "../../styles/StyledButton";
import { login } from "../../services/apiAuth";
import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }
  return (
    <StyledSignInForm onSubmit={handleSubmit}>
      <Heading textalign="center">Sign in!</Heading>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Username/Email:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput
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
          placeholder=" ********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem" content="end">
        <StyledHref href="/">Forgot your password?</StyledHref>
      </Row>
      <Row>
        <StyledButton>Sign In</StyledButton>
      </Row>
    </StyledSignInForm>
  );
}

export default SignInForm;
