import styled from "styled-components";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";
import Button from "../styles/StyledButton";
import { Link } from "react-router-dom";

const StyledUserContainer = styled.div`
  /* background: radial-gradient(
    circle,
    #29364789 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  ); */
  background-color: var(--bg-color-light-0);
  /* background-color: #131f2e; */

  height: 100%;
  padding: 3rem;
`;

const StyledSettingsMain = styled.main`
  border-radius: 10px;
  background-color: #ffffffd1;
  /* height: 50vh; */
  width: 100vh;
  padding: 3rem;
`;

function User() {
  return (
    <StyledUserContainer>
      <Row content="center">
        <StyledSettingsMain>
          <Row type="horizontal" content="start">
            <Heading as="h2">User</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">Username: Thanasis </Heading>
            {/* <StyledButton size="small">Change</StyledButton> */}
          </Row>
          <Row content="start">
            <Heading as="h3">Password: ******* </Heading>
            {/* <StyledButton size="small">Change</StyledButton> */}
          </Row>
          <br></br>
          <hr></hr>
          <Row type="horizontal" content="start">
            <Heading as="h2">Courses</Heading>
          </Row>
          <Row>{/* <Button size="small">My Courses</Button> */}</Row>
          <Row type="horizontal" content="start">
            <Heading as="h2">Quizes</Heading>
          </Row>
          <Row>
            <Link to="/myQuizzes">
              <Button size="small">My Quizzes</Button>
            </Link>
          </Row>
          <br></br>
          <hr></hr>
        </StyledSettingsMain>
      </Row>
    </StyledUserContainer>
  );
}

export default User;
