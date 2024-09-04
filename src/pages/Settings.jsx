import styled from "styled-components";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";

const StyledSettingsContainer = styled.div`
  /* background: radial-gradient(
    circle,
    #29364789 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  ); */
  background-color: var(--bg-color-light-0);
  /* background-color: #131f2e; */

  height: 100%;
  padding: 3rem;
`;

const StyledSettingsMain = styled.main`
  border-radius: 10px;
  background-color: #ffffffd1;
  height: 50vh;
  width: 100vh;
  padding: 3rem;
`;

function Settings() {
  return (
    <StyledSettingsContainer>
      <Row content="center">
        <StyledSettingsMain>
          <Row type="horizontal" content="start">
            <Heading as="h2">Colors</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">LightMode</Heading>
            {/* <StyledButton size="small" disabled>
              Dark Mode
            </StyledButton> */}
          </Row>
          <br></br>
          <hr></hr>
          <Row type="horizontal" content="start">
            <Heading as="h2">Other</Heading>
          </Row>
          <Row content="start">
            <Heading as="h3">Showing completed courses.</Heading>
            {/* <StyledButton size="small">Do not show</StyledButton> */}
          </Row>
          <Row content="start">
            <Heading as="h3">Showing completed quizes.</Heading>
            {/* <StyledButton size="small">Do not show</StyledButton> */}
          </Row>
          <br></br>
          <hr></hr>
        </StyledSettingsMain>
      </Row>
    </StyledSettingsContainer>
  );
}

export default Settings;
