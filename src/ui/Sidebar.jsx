import StyledSidebar from "../styles/StyledSidebar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Row from "../styles/Row";
import StyledSearchInput from "../styles/StyledSearchInput";

function Sidebar() {
  return (
    <StyledSidebar>
      <Row>
        <HiMagnifyingGlass size={20}></HiMagnifyingGlass>
        <StyledSearchInput></StyledSearchInput>
      </Row>
    </StyledSidebar>
  );
}

export default Sidebar;
