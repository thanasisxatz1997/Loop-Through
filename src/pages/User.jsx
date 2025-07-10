import styled from "styled-components";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useIsAdmin } from "../features/admin/useIsAdmin";

const StyledUserContainer = styled.div`
  /* background: radial-gradient(
    circle,
    #29364789 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  ); */
  /* background-color: var(--bg-color-light-0); */
  /* background-color: #131f2e; */
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */
      url("/vecteezy_white-and-blue-gradient-dynamic-fluid-shapes-abstract_32403065-1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  height: 100%;
  padding: 3rem;
`;

const StyledSettingsMain = styled.main`
  border-radius: 10px;
  background-color: var(--color-grey-0);
  /* height: 50vh; */
  width: 100vh;
  padding: 3rem;
  box-shadow: 5px 8px 12px 3px var(--color-grey-700);
`;

function User() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isPending, isFetching } = useUser();
  const { isAdmin, isPendingisAdmin } = useIsAdmin();
  console.log(user);

  async function handleLogOut() {
    try {
      const isLogedOut = await logout();
      if (isLogedOut) {
        queryClient.setQueryData(["user"], null);
        navigate("/home");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  return (
    <StyledUserContainer>
      <Row content="center">
        <StyledSettingsMain>
          <Row type="horizontal" content="start">
            <Heading as="h2">User</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">Username: {user.user_metadata.username} </Heading>
            {/* <StyledButton size="small">Change</StyledButton> */}
          </Row>
          <Row content="start">
            <Heading as="h3">Password: ******* </Heading>
            {/* <StyledButton size="small">Change</StyledButton> */}
          </Row>
          <Row content="start">
            {isAdmin && (
              <Button onClick={navigate("/admin")}>Admin Panel</Button>
            )}
          </Row>
          <br></br>
          <hr></hr>
          <Row type="horizontal" content="start">
            <Heading as="h2">Courses</Heading>
          </Row>
          <Row>
            <Link to="/myCourses">
              <Button size="small">My Courses</Button>
            </Link>
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
          <br></br>
          <Row type="horizontal" content="start">
            <Heading as="h2">Colors</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">LightMode</Heading>
            {/* <StyledButton size="small" disabled>
                        Dark Mode
                      </StyledButton> */}
          </Row>
          <br></br>
          <hr></hr>
          <Row type="horizontal" content="start">
            <Heading as="h2">Other</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">Showing completed courses.</Heading>
            {/* <StyledButton size="small">Do not show</StyledButton> */}
          </Row>
          <Row content="start">
            <Heading as="h3">Showing completed quizes.</Heading>
            {/* <StyledButton size="small">Do not show</StyledButton> */}
          </Row>
          <br></br>
          <hr></hr>
          <br></br>
          <Button variation="danger" onClick={() => handleLogOut()}>
            Log Out
          </Button>
        </StyledSettingsMain>
      </Row>
    </StyledUserContainer>
  );
}

export default User;
