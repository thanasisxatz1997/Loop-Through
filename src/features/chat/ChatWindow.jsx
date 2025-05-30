import { useEffect, useState, useRef } from "react";
import supabase from "../../services/supabase";
import Button from "../../styles/StyledButton";
import Row from "../../styles/Row";
import Message from "./Message";
import styled from "styled-components";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import { HiArrowUpRight } from "react-icons/hi2";

const Container = styled.div`
  max-height: 600px;
  margin-bottom: 10px;
`;

const StyledMessageArea = styled.div`
  width: 500px;
  height: 500px; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

function ChatWindow({ chatName, displayedName = "", handleClose }) {
  const channelRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const { user } = useUser();
  const userName = user?.user_metadata?.username || "Anonymous";

  async function sendMessage(message) {
    if (!message.trim()) return;
    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ text: message, userName, courseId: chatName }]);
      if (error) throw error;
      setMessageToSend("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("courseId", chatName)
      .order("id", { ascending: false })
      .limit(10);

    if (error) {
      setError(error.message);
      return;
    }
    setMessages(data.reverse());
  };

  useEffect(() => {
    fetchMessages();

    if (!channelRef.current) {
      channelRef.current = supabase
        .channel(chatName)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            if (payload.new.courseId === chatName) {
              setMessages((prevMessages) => [...prevMessages, payload.new]);
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [chatName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <Row
        content="space-between"
        padding="10px"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <h2>{displayedName}</h2>
        <Button variation="danger" size="small" onClick={handleClose}>
          <HiArrowUpRight size={25}></HiArrowUpRight>
        </Button>
      </Row>
      <hr></hr>
      <StyledMessageArea>
        <Row type="vertical">
          {messages.map((message, i) => (
            <Message
              key={message.id || i}
              message={message}
              isYou={message.userName === userName}
            />
          ))}
        </Row>
        <div ref={messagesEndRef} />
      </StyledMessageArea>
      <Row content="center" gap="1rem" margin="10px">
        <StyledFormTextInput
          type="text"
          placeholder="Enter a message"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          style={{ width: "100%", height: "44px" }}
        />
        <Button size="medium" onClick={() => sendMessage(messageToSend)}>
          <HiPaperAirplane size={20} />
        </Button>
      </Row>
    </Container>
  );
}

export default ChatWindow;
