import styled from "styled-components";

const StyledSelectBox = styled.select`
  position: relative;
  min-width: 50px;
  border-radius: 5px;
  font-size: large;
  svg {
    position: absolute;
    right: 12px;
    top: calc(50% - 3px);
    width: 10px;
    height: 6px;
    stroke-width: 2px;
    stroke: #9098a9;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
  select {
    -webkit-appearance: none;
    padding: 7px 40px 7px 12px;
    width: 100%;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    transition: all 150ms ease;
  }
  select:required:invalid {
    color: #5a667f;
  }
  select option {
    color: #223254;
  }
  select option[value=""][disabled] {
    display: none;
  }
  select:focus {
    outline: none;
    border-color: #07f;
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
  }
  select:hover + svg {
    stroke: #07f;
  }
`;

function SelectBox({
  selectTitle = "Select Option",
  options = [
    { value: "#", name: "One" },
    { value: "#", name: "Two" },
  ],
  onChange,
}) {
  return (
    <StyledSelectBox onChange={onChange}>
      <option value={""} className="selected" disabled>
        {selectTitle}
      </option>
      {options.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelectBox>
  );
}

export default SelectBox;
