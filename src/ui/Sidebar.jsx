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
import SearchBar from "./SearchBar";

const StyledSidebarItem = styled.button`
  background-color: var(--color-brand-200);
`;

const SidebarCourseItem = styled.div`
  padding-left: 5px;
  border-radius: 2px;
  border-left: solid 5px var(--color-grey-500);
  &:hover {
    border-left: solid 5px blue;
    background-color: var(--color-brand-50);
  }
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

  console.log("sidebar courses: ", displayedCourses);
  return (
    <StyledSidebar gap="10px">
      <Heading textalign="center">Courses</Heading>
      <Row content="center">
        {/* <HiMagnifyingGlass size={20}></HiMagnifyingGlass> */}
        <SearchBar
          width="32rem"
          placeholder="Search for a course!"
          searchText={search}
          setSearchText={setSearch}
        ></SearchBar>
        {/* <StyledSearchInput></StyledSearchInput> */}
      </Row>
      <Row gap="5px">
        <div>{`Tags(${searchTags.length}): `}</div>
        <Row
          gap="5px"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "flex",
            width: "100%",
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
      <hr></hr>
      <Row type="vertical" gap="1.5px">
        {displayedCourses.map((course, index) => (
          <SidebarCourseItem key={`${course.id}-${index}`}>
            <a href={`/course/:${course.id}`}>
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
                <Row>
                  <div
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      marginLeft: "10px",
                    }}
                  >
                    {`${course.rating}`}
                  </div>
                  <HiOutlineStar
                    style={{
                      paddingBottom: "1px",
                      color: "var(--color-yellow-700)",
                    }}
                  ></HiOutlineStar>
                  {`(${course.totalRatings})`}
                </Row>
              </Row>
            </a>
          </SidebarCourseItem>
        ))}
      </Row>
    </StyledSidebar>
  );
}

export default Sidebar;
