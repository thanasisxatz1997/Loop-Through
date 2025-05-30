import styled from "styled-components";
import { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    background-color: red;
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
  fill: css`
    font-size: 1.6rem;
    font-weight: 500;
    align-self: stretch;
    padding: 1rem;
  `,
};

const variations = {
  success: css`
    color: var(--color-brand-50);
    background-color: var(--color-green-600);

    &:hover {
      background-color: var(--color-green-700);
    }
  `,
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-200);
    border: 1px solid var(--color-grey-300);

    &:hover {
      background-color: var(--color-grey-400);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  transparent: css`
    background-color: transparent;
  `,
};

const shadows = {
  none: css``,
  small: css`
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  `,
  medium: css`
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
  `,
  large: css`
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
  `,
};

const Button = styled.button`
  border: none;
  ${(props) => shadows[props.shadow]}
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
  ${(props) =>
    props.selectedoptionbutton === "true" &&
    css`
      background-color: var(--color-grey-100);
      color: var(--color-grey-700);
      &:hover {
        background-color: var(--color-grey-100);
      }
    `}
  ${(props) =>
    props.borderradius !== "" &&
    css`
      border-radius: ${props.borderradius};
    `}
    ${(props) =>
    props.optionbutton === "true" &&
    css`
      box-sizing: border-box;
    `}
    white-space: nowrap;
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
  shadow: "large",
  borderradius: "",
  selectedoptionbutton: "false",
  optionbutton: "",
};

export default Button;
