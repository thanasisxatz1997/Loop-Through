import StyledSidebar from "../styles/StyledSidebar";
import { HiMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import Row from "../styles/Row";
import StyledSearchInput from "../styles/StyledSearchInput";
import { useState } from "react";
import Button from "../styles/StyledButton";
import styled from "styled-components";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import Heading from "../styles/Heading";
import { HiStar } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi2";
import Modal from "./Modal";

const StyledSidebarItem = styled.button`
  background-color: var(--color-brand-200);
`;

function Sidebar({ courses, searchTags }) {
  const [search, setSearch] = useState("");
  const displayedCourses = filterSearchParameters();

  function isSubset(a, b) {
    const hashSet = new Set(a);
    for (const num of b) {
      if (!hashSet.has(num)) {
        return false;
      }
    }
    return true;
  }

  function filterSearchParameters() {
    const searchTextFilteredCourses = courses.filter((course) =>
      course.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    if (searchTags.length > 0) {
      const tagsFilteredCourses = searchTextFilteredCourses.filter((course) =>
        isSubset(course.tags, searchTags)
      );
      return tagsFilteredCourses;
    } else {
      return searchTextFilteredCourses;
    }
  }

  return (
    <StyledSidebar>
      <Heading textalign="center">Courses</Heading>
      <Row>
        <HiMagnifyingGlass size={20}></HiMagnifyingGlass>
        <StyledSearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></StyledSearchInput>
      </Row>
      <Row gap="5px">
        {`Tags: `}
        <Row
          gap="5px"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "flex",
            width: "100%", // Ensures it respects the parent container width
          }}
        >
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flex: "1",
            }}
          >
            {searchTags.map((tag, i) => (
              <span key={i} style={{ fontSize: "12px" }}>
                {tag}
                {i !== searchTags.length - 1 && ", "}
              </span>
            ))}
          </div>
        </Row>
        <Modal.Open opens="addTagsModal" fun={() => {}}>
          <Button size="small">
            <HiMiniPencilSquare size={20}></HiMiniPencilSquare>
          </Button>
        </Modal.Open>
      </Row>
      <Row type="vertical" gap="1.5px">
        {displayedCourses.map((course) => (
          <StyledSidebarLessonItem>
            <Row content="space-between" align-items="center">
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "160px",
                  minHeight: "20px",
                }}
              >{`${course.name}`}</div>
              <div
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  marginLeft: "10px",
                }}
              >
                {course.rating}
              </div>
              <HiOutlineStar
                style={{
                  paddingBottom: "1px",
                  color: "var(--color-yellow-700)",
                }}
              ></HiOutlineStar>
            </Row>
          </StyledSidebarLessonItem>
        ))}
      </Row>
    </StyledSidebar>
  );
}

export default Sidebar;
