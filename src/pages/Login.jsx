import styled from "styled-components";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";
import SignInForm from "../features/authentication/SignInForm";
import RegisterForm from "../features/authentication/RegisterForm";
import TextModal from "../styles/TextModal";
import AuthOptions from "../features/authentication/AuthOptions";

const StyledUserContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFormSelector = styled.div`
  border-radius: 10px;
  /* border: solid 1px; */
`;

function Login() {
  return (
    <StyledUserContainer>
      <TextModal
        width="400px"
        height="90px"
        margin="200px 20px"
        position="absolute"
        top="3%"
        left="2%"
      >
        Start learning now! Create an account and start your first course.
      </TextModal>
      <AuthOptions>
        <Row type="vertical" gap="0">
          <Row>
            <StyledFormSelector>
              <Row>
                <AuthOptions.Selector />
              </Row>
            </StyledFormSelector>
          </Row>
          {/* <SignInForm></SignInForm> */}
          {/* <RegisterForm></RegisterForm> */}
          <AuthOptions.FormWindow name="signIn">
            <SignInForm />
          </AuthOptions.FormWindow>
          <AuthOptions.FormWindow name="register">
            <RegisterForm />
          </AuthOptions.FormWindow>
        </Row>
      </AuthOptions>
    </StyledUserContainer>
  );
}

export default Login;
