import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import Row from "../../styles/Row";

const StyledUserContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthOptionsContext = createContext();

function AuthOptions({ children }) {
  const [openName, setOpenName] = useState("signIn");
  const open = setOpenName;

  return (
    <AuthOptionsContext.Provider value={{ openName, open }}>
      {children}
    </AuthOptionsContext.Provider>
  );
}

function Selector({ children }) {
  const { openName, open } = useContext(AuthOptionsContext);
  return (
    <Row>
      <StyledButton
        size="fill"
        borderradius="9px 0px 0px 0px"
        selectedoptionbutton={openName === "signIn" ? "true" : "false"}
        optionbutton="true"
        disabled={openName === "signIn"}
        onClick={() => open("signIn")}
      >
        Sign In
      </StyledButton>
      <StyledButton
        size="fill"
        borderradius="0px 9px 0px 0px"
        selectedoptionbutton={openName === "register" ? "true" : "false"}
        optionbutton="true"
        disabled={openName === "register"}
        onClick={() => open("register")}
      >
        Register
      </StyledButton>
    </Row>
  );
}

// function Selector({ children, name, radius }) {
//   const { openName, open } = useContext(AuthOptionsContext);
//   return (
//     <StyledButton
//       size="fill"
//       borderRadius={radius}
//       selectedOptionButton={openName === name ? "true" : "false"}
//       optionButton="true"
//       disabled={openName === name}
//       onClick={open(openName)}
//     >
//       {children}
//     </StyledButton>
//   );
// }

function FormWindow({ children, name }) {
  const { openName } = useContext(AuthOptionsContext);
  if (name !== openName) return;
  return <div>{children}</div>;
}

AuthOptions.Selector = Selector;
AuthOptions.FormWindow = FormWindow;

export default AuthOptions;
