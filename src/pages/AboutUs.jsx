import styled from "styled-components";
import Accordion from "../ui/Accordion";
import Row from "../styles/Row";
import Heading from "../styles/Heading";

const StyledAboutContent = styled.div`
  /* background-color: var(--bg-color-light-0); */
  height: 100%;
  padding: 5rem 2rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */ url("/img-j8f9cwencw9eb.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function AboutUs() {
  return (
    <StyledAboutContent>
      <Row type="vertical">
        <Row content="center">
          <Heading>FAQ</Heading>
        </Row>
        <Accordion></Accordion>
      </Row>
    </StyledAboutContent>
  );
}

export default AboutUs;
