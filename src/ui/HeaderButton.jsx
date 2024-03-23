import Button from "./Button";

function HeaderButton({ children }) {
  return (
    <Button size="small" variation="transparent">
      {children}
    </Button>
  );
}

export default HeaderButton;
