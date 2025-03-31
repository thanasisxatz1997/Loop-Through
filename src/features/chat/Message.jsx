import styled from "styled-components";
import { MdVerified } from "react-icons/md";
import { truncateText } from "../../services/helpers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Styled Components
const MessageContainer = styled.div`
  display: grid;
  justify-items: ${(props) => (props.isYou ? "end" : "start")};
`;

const MessageBubble = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr 25px;
  grid-template-columns: 1fr;
  width: 70%;
  padding: 10px 15px;
  border-radius: 5px;
  border-top-left-radius: ${(props) => (props.isYou ? "5px" : "0")};
  border-top-right-radius: ${(props) => (props.isYou ? "0" : "5px")};
  background: ${(props) => (props.isYou ? "#dbfff9" : "#edf3f9")};
  margin-top: 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${(props) =>
      props.isYou ? "0px 0px 10px 10px" : "0px 10px 10px 0"};
    border-color: ${(props) =>
      props.isYou
        ? "transparent transparent transparent #dbfff9"
        : "transparent #edf3f9 transparent transparent"};
    top: 0;
    left: ${(props) => (props.isYou ? "auto" : "-10px")};
    right: ${(props) => (props.isYou ? "-10px" : "auto")};
  }
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: gray;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const VerifiedIcon = styled(MdVerified)`
  color: #1d9bf0;
  margin-left: 5px;
`;

const CountryTag = styled.span`
  font-size: 10px;
  margin-left: 5px;
  display: inline-block;

  img {
    display: inline-block;
    margin-top: -4px;
    width: 16px;
    height: 12px;
  }
`;

const MessageText = styled.div`
  text-align: left;
  word-break: break-word;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
`;

const Timestamp = styled.div`
  color: gray;
  font-size: 10px;
  justify-self: end;
  align-self: end;
`;

// Component
export default function Message({ message, isYou }) {
  console.log(message);
  const countyCode =
    message?.country && message?.country !== "undefined"
      ? message.country.toLowerCase()
      : "";

  return (
    <MessageContainer isYou={isYou}>
      <MessageBubble isYou={isYou}>
        <Username>
          {message.userName}
          {message.is_authenticated && <VerifiedIcon />}
          {countyCode && (
            <CountryTag>
              from {message.country}{" "}
              <img src={`/flags/${countyCode}.png`} alt={message.country} />
            </CountryTag>
          )}
        </Username>
        <MessageText>{truncateText(message.text)}</MessageText>
        <Timestamp>{dayjs(message.timestamp).fromNow()}</Timestamp>
      </MessageBubble>
    </MessageContainer>
  );
}
