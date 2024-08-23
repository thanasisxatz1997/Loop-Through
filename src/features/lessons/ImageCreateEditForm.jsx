import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import FileInput from "../../styles/FileInput";
import { useState } from "react";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const sizeXOptions = [
  { value: "300px", name: "300 px" },
  { value: "500px", name: "500 px" },
];
const sizeYOptions = [
  { value: "300px", name: "300 px" },
  { value: "500px", name: "500 px" },
];

function ImageCreateEditForm() {
  const [courseImage, setCourseImage] = useState(null);
  const [sizeX, setSizeX] = useState("300px");
  const [sizeY, setSizeY] = useState("300px");
  function onSizeXChanged(e) {
    console.log("changed X");
    setSizeX(e.target.value);
  }

  function onSizeYChanged(e) {
    console.log("Changed Y");
    setSizeY(e.target.value);
  }
  console.log("now sizeX is : ", sizeX);
  console.log("now sizeY is : ", sizeY);
  return (
    <StyledFormContainer>
      <Row content="flex-start" margin="10px 0px">
        <StyledFormLabel>Image:</StyledFormLabel>
        <FileInput
          id="image"
          accept="image/*"
          // {...register("image", {
          //   required: "This field is required",
          // })}
          onChange={(e) => {
            console.log(e.target.files[0]);
            setCourseImage(URL.createObjectURL(e.target.files[0]));
          }}
        ></FileInput>
      </Row>
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledFormLabel>Image size X:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Size x"
          options={sizeXOptions}
          value={sizeX}
          onChange={(e) => onSizeXChanged(e)}
        ></SelectBox>
        <StyledFormLabel>Image size Y:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Size y"
          options={sizeYOptions}
          value={sizeY}
          onChange={(e) => onSizeYChanged(e)}
        ></SelectBox>
      </Row>
      <Row content="center">
        <img
          src={courseImage}
          alt="Not found"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: sizeX,
            height: sizeY,
            objectFit: "contain",
          }}
        ></img>
      </Row>
    </StyledFormContainer>
  );
}

export default ImageCreateEditForm;
