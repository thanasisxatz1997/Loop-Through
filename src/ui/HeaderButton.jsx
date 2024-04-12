import Button from "./Button";
import Row from "../styles/Row";

function HeaderButton({ children }) {
  return (
    <Button size="large" variation="transparent" shadow="none">
      <Row type="horizontal" content="start">
        {children}
      </Row>
    </Button>
  );
}

export default HeaderButton;
