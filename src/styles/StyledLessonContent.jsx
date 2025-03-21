import styled from "styled-components";

const StyledLessonContent = styled.div`
  margin-bottom: 1rem;
  border-radius: 20px;
  padding: 2rem;
  background-color: var(--color-blue-100);
  width: auto;
  height: 100%;
  min-height: 40rem;

  max-height: 750px; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 10px;
  &::-webkit-scrollbar {
    width: 6px; /* Slim scrollbar */
    height: 50px; /* Adjust the scrollbar height */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    margin: 20px 0; /* Adds space above and below scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  border: 1px solid #ddd;
  box-shadow: var(--color-grey-900) 0 2px 4px,
    var(--color-grey-900) 0 7px 13px -3px, var(--color-grey-300) 0 -3px 0 inset;
`;

export default StyledLessonContent;
