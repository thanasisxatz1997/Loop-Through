import styled from "styled-components";
import TextModal from "../styles/TextModal";
import Accordion from "../ui/Accordion";

const StyledHomeContainer = styled.div`
  background-image: url("/LoopThroughlogo.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #79bbdd;
  /* background-size: 100% 100%; */
  min-height: 92vh;
  object-fit: contain;
  display: flex;
  justify-content: space-between;
`;

function Home() {
  return (
    <StyledHomeContainer>
      <TextModal width="300px" height="360px" margin="200px 20px">
        One of the best learning platforms! Start your journey by completing
        some lectures and then test your skills by solving some of our quizes!
        If you ever feel like you need help or that you dont understand a
        courses matterial dont you worry! You always have the option of
        contacting the author for some help!
      </TextModal>

      <TextModal width="200px" height="200px">
        Are you confident in your skills? You can become a teacher by uploading
        a course yourself!
      </TextModal>
    </StyledHomeContainer>
  );
}

export default Home;
