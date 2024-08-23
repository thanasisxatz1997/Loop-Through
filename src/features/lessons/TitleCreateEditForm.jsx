import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const titleOptions = [
  {
    value: "h1",
    name: "Large",
  },
  {
    value: "h2",
    name: "Medium",
  },
  {
    balue: "h3",
    name: "Small",
  },
];

function TitleCreateEditForm() {
  return (
    <StyledFormContainer>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Title:</StyledFormLabel>
        <StyledFormTextInput></StyledFormTextInput>
      </Row>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Size:</StyledFormLabel>
        <SelectBox selectTitle="Select Size" options={titleOptions}></SelectBox>
      </Row>
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledButton variation="success">Cancel</StyledButton>
        <StyledButton variation="danger">Cancel</StyledButton>
      </Row>
    </StyledFormContainer>
  );
}

export default TitleCreateEditForm;
