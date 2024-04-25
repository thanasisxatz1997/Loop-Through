import Heading from "../styles/Heading";

function LessonElement({ element }) {
  const type = element.type;
  const content = element.content;
  switch (type) {
    case "p":
      return <p style={{ textAlign: "center" }}>{content}</p>;
    case "t":
      return (
        <Heading as="h3" style={{ textAlign: "center" }}>
          {content}
        </Heading>
      );
    case "i":
      return (
        <img
          src={content}
          alt="Not found"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: element.sizeX,
            height: element.sizeY,
            objectFit: "contain",
          }}
        ></img>
      );
    default:
      return <Heading as="h3">Error</Heading>;
  }
}

export default LessonElement;
