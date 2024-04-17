import StyledButton from "../styles/StyledButton";
import Row from "../styles/Row";

function HeaderButton({ children }) {
  return (
    <StyledButton size="large" variation="transparent" shadow="none">
      <Row type="horizontal" content="start">
        {children}
      </Row>
    </StyledButton>
  );
}

export default HeaderButton;
