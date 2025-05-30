import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import HeaderButton from "./HeaderButton";
import { NavLink } from "react-router-dom";

import {
  HiOutlineHome,
  HiAcademicCap,
  HiCodeBracket,
  HiPencilSquare,
  HiMiniUser,
  HiMiniQuestionMarkCircle,
} from "react-icons/hi2";
import HeaderRow from "../styles/HeaderRow";
import { useUser } from "../features/authentication/useUser";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  min-width: 1200px;
`;

const Logo = styled.img`
  height: 6.6rem;
  width: auto;
  object-fit: contain;
  margin-right: 1.2rem;
`;

function Header() {
  const { isAuthenticated } = useUser();
  return (
    <StyledHeader>
      <Row type="horizontal">
        <Row>
          <Logo src="/startGriptLogo_cropped.jpg" alt=""></Logo>
          <Heading as="h1" userselect="false">
            Stark Gript
          </Heading>
        </Row>

        <HeaderRow>
          <NavLink to="/home">
            <HeaderButton>
              <h3>Home</h3>
              <HiOutlineHome size={30}></HiOutlineHome>
            </HeaderButton>
          </NavLink>
          <NavLink to="/courses">
            <HeaderButton>
              <h3>Learn</h3>
              <HiAcademicCap size={30}></HiAcademicCap>
            </HeaderButton>
          </NavLink>
          <NavLink to="/quizes">
            <HeaderButton>
              <h3>Quiz</h3>
              <HiPencilSquare size={30}></HiPencilSquare>
            </HeaderButton>
          </NavLink>
          <NavLink to="/code-editor">
            <HeaderButton>
              <h3>Code Editor</h3>
              <HiCodeBracket size={30}></HiCodeBracket>
            </HeaderButton>
          </NavLink>
          <NavLink to="/info">
            <HeaderButton>
              <h3>About</h3>
              <HiMiniQuestionMarkCircle size={30}></HiMiniQuestionMarkCircle>
            </HeaderButton>
          </NavLink>
          {/* <NavLink to="/settings">
            <HeaderButton>
              <h3>Settings</h3>
              <HiMiniCog6Tooth size={30}></HiMiniCog6Tooth>
            </HeaderButton>
          </NavLink> */}
          {isAuthenticated ? (
            <NavLink to="/user">
              <HeaderButton>
                <h3>User</h3>
                <HiMiniUser size={30}></HiMiniUser>
              </HeaderButton>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <HeaderButton>
                <h3>Sign In</h3>
                <HiMiniUser size={30}></HiMiniUser>
              </HeaderButton>
            </NavLink>
          )}
        </HeaderRow>
      </Row>
    </StyledHeader>
  );
}

export default Header;
