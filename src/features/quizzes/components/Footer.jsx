import styled from "styled-components";

const StyledFooter = styled.footer`
  /* margin: 2rem 15%; */
  justify-self: end;
`;

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

export default Footer;
