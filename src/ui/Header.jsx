import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import HeaderButton from "./HeaderButton";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineHomeModern,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Row type="horizontal">
        <Heading as="h1">Loop Through</Heading>
        <HeaderButton>
          <HiOutlineHome></HiOutlineHome>
        </HeaderButton>
      </Row>
    </StyledHeader>
  );
}

export default Header;
