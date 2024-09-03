import styled from "styled-components";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  /* padding: 2px; */
  background-color: #fff;
`;

const StyledSearchBar = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding-left: 2px 2px;
  height: 2.5rem;
`;

const StyledIcon = styled(HiMagnifyingGlassCircle)`
  color: #aaa;
`;

function SearchBar() {
  return (
    <SearchContainer>
      <StyledSearchBar type="text"></StyledSearchBar>
      <StyledIcon size={20} />
    </SearchContainer>
  );
}

export default SearchBar;
