import styled from "styled-components";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledButton from "../../styles/StyledButton";

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
  return (
    <StyledSignInForm>
      <Heading textalign="center">Register!</Heading>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Username:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput placeholder=" Username"></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Email:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput placeholder=" email@domain.com"></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Password:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput placeholder=" ********"></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledFormLabel>
          <Heading as="h3">{`Retype Password:`}</Heading>
        </StyledFormLabel>
        <StyledFormTextInput placeholder=" ********"></StyledFormTextInput>
      </Row>
      <Row>
        <StyledButton>Register</StyledButton>
      </Row>
    </StyledSignInForm>
  );
}

export default RegisterForm;
