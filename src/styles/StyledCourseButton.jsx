import styled, { css } from "styled-components";

const StyledCourseButton = styled.button`
  border-radius: 10%;
  min-height: 250px;
  min-width: 250px;
  max-height: 250px;
  max-width: 250px;
  text-overflow: none;
  width: 250px;
  height: 250px;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-100);

  ${(props) =>
    props.backgroundimage === "none"
      ? css`
          background-color: var(--color-grey-500);
        `
      : css`
          background-image: url(${(props) =>
            props.backgroundimage.replace(/ /g, "%20")});
        `}
  background-size: 250px 250px;
  background-position: right center;
  width: 100%;
  height: 100%;
  box-shadow: 5px 8px 12px 3px var(--color-grey-700);
  border: none;
  animation: flip-in-hor-bottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes flip-in-hor-bottom {
    0% {
      transform: rotateX(80deg);
      opacity: 0;
    }
    100% {
      transform: rotateX(0);
      opacity: 1;
    }
  }
`;

StyledCourseButton.defaultProps = {
  backgroundimage: "none",
  // backgroundImage:
  //   "https://assets.leetcode.com/explore/cards/top-151-interview-questions/img",
  // "https://assets.leetcode.com/explore/cards/leetcodes-interview-crash-course-data-structures-and-algorithms/img-1663091244.png",
};

export default StyledCourseButton;
