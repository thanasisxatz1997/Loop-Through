import styled, { css } from "styled-components";
import StyledSearchInput from "../styles/StyledSearchInput";
import Row from "../styles/Row";
import { HiMagnifyingGlass } from "react-icons/hi2";
import StyledButton from "../styles/StyledButton";
import Heading from "../styles/Heading";

const StyledQuizesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledQuizesMainContainer = styled.main`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const StyledQuizListItem = styled.li`
  background-color: var(--color-grey-100);
  border: solid 1px;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-color: var(--color-grey-400);
  ${(props) => css`
    animation: slide-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${props.delay}
      both;
  `}
  @keyframes slide-left {
    0% {
      display: none;
      transform: translateX(200px);
    }
    100% {
      display: block;
      transform: translateX(0px);
    }
  }
`;

const StyledQuizList = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: #ffffff59;
  min-width: 50rem;
  max-width: 50rem;
`;

function Quizes() {
  return (
    <StyledQuizesContainer>
      <StyledQuizesMainContainer>
        <Row content="center">
          <HiMagnifyingGlass size={20}></HiMagnifyingGlass>
          <StyledSearchInput></StyledSearchInput>
        </Row>
        <StyledQuizList>
          <StyledQuizListItem delay="0.0s">
            <Row content="space-between">
              <Heading as={"h3"}>Quiz1</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem delay="0.3s">
            <Row content="space-between">
              <Heading as={"h3"}>Quiz2</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem delay="0.6s">
            <Row content="space-between">
              <Heading as={"h3"}>Quiz3</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem delay="0.9s">
            <Row content="space-between">
              <Heading as={"h3"}>Quiz4</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
        </StyledQuizList>
      </StyledQuizesMainContainer>
    </StyledQuizesContainer>
  );
}

export default Quizes;
