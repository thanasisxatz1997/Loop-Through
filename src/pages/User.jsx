import styled from "styled-components";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";
import SignInForm from "../features/authentication/SignInForm";
import RegisterForm from "../features/authentication/RegisterForm";
import TextModal from "../styles/TextModal";

const StyledUserContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ;
`;

const StyledFormSelector = styled.div`
  border-radius: 10px;
  /* border: solid 1px; */
`;

function User() {
  return (
    <StyledUserContainer>
      <TextModal
        width="400px"
        height="90px"
        margin="200px 20px"
        position="absolute"
        top="3rem"
        left="2rem"
      >
        Start learning now! Create an account and start your first course.
      </TextModal>
      <Row type="vertical" gap="0">
        <Row>
          <StyledFormSelector>
            <Row>
              <StyledButton
                size="fill"
                borderRadius="9px 0px 0px 0px"
                selectedOptionButton="true"
                optionButton="true"
                disabled
              >
                Sign In
              </StyledButton>
              <StyledButton
                size="fill"
                borderRadius="0px 9px 0px 0px"
                optionButton="true"
              >
                Register
              </StyledButton>
            </Row>
          </StyledFormSelector>
        </Row>
        {/* <SignInForm></SignInForm> */}
        <RegisterForm></RegisterForm>
      </Row>
    </StyledUserContainer>
  );
}

export default User;
