import Heading from "../styles/Heading";

function LessonElement({ element }) {
  const type = element.type;
  const content = element.content;
  switch (type) {
    case "p":
      return (
        <p
          style={{
            textAlign: element.textAlign ? element.textAlign : "",
            fontSize: element.size ? element.size : "15px",
            backgroundColor: element.backgroundColor
              ? element.backgroundColor
              : "",
          }}
        >
          {content}
        </p>
      );
    case "t":
      return (
        <Heading
          as={element.size}
          textalign={element.textAlign ? element.textAlign : "center"}
          style={{ textalign: "center" }}
        >
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
