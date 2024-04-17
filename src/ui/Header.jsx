import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import HeaderButton from "./HeaderButton";
import { NavLink } from "react-router-dom";

import {
  HiOutlineHome,
  HiAcademicCap,
  HiMiniCog6Tooth,
  HiPencilSquare,
} from "react-icons/hi2";
import HeaderRow from "../styles/HeaderRow";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Row type="horizontal">
        <Row>
          <img src="/LoopThroughLogoResizedSmall.png" alt=""></img>
          <Heading as="h1" userselect="false">
            Loop Through
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
          <NavLink to="/Settings">
            <HeaderButton>
              <h3>Settings</h3>
              <HiMiniCog6Tooth size={30}></HiMiniCog6Tooth>
            </HeaderButton>
          </NavLink>
        </HeaderRow>
      </Row>
    </StyledHeader>
  );
}

export default Header;
