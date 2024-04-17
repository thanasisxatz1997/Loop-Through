import styled from "styled-components";
import StyledSearchInput from "../styles/StyledSearchInput";
import Row from "../styles/Row";
import { HiMagnifyingGlass } from "react-icons/hi2";
import StyledButton from "../styles/StyledButton";
import Heading from "../styles/Heading";

const StyledQuizesContainer = styled.div`
  background: radial-gradient(
    circle,
    #7ca3d68a 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  );
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
          <StyledQuizListItem>
            <Row content="space-between">
              <Heading as={"h3"}>Quiz1</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem>
            <Row content="space-between">
              <Heading as={"h3"}>Quiz2</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem>
            <Row content="space-between">
              <Heading as={"h3"}>Quiz3</Heading>
              <StyledButton size="small">start</StyledButton>
            </Row>
          </StyledQuizListItem>
          <StyledQuizListItem>
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
