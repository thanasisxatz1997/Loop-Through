import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isPending, isAuthenticated, isFetching } = useUser();

  //2. If there is no authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isPending && !isAuthenticated && !isFetching) {
        navigate("/login");
        console.log("navigated to login");
      }
    },
    [isAuthenticated, isPending, navigate, isFetching]
  );

  //3. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, render the app
  if (isAuthenticated) {
    return children;
  }

  return null;
}

export default ProtectedRoute;
