import styled, { css } from "styled-components";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { useState } from "react";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid #e8eaed; */
  border-radius: 5px;
  /* padding: 2px; */
  background-color: #fff;
  ${(props) =>
    css`
      border: ${props.border};
    `}
`;

SearchContainer.defaultProps = {
  border: "1px solid #e8eaed",
};

const StyledSearchBar = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding-left: 2px 2px;
  min-height: 2.5rem;
  height: auto;
  border-radius: 5px;
  padding-left: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const StyledIcon = styled(HiMagnifyingGlassCircle)`
  color: #aaa;
`;

function SearchBar({
  border,
  placeholder = "",
  searchText,
  setSearchText,
  width = "auto",
}) {
  console.log(width);
  // const [searchText, setSearchText] = useState("");
  return (
    <SearchContainer border={border}>
      <StyledSearchBar
        style={{ width: width }}
        type="text"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></StyledSearchBar>
      <StyledIcon size={20} />
    </SearchContainer>
  );
}

export default SearchBar;
