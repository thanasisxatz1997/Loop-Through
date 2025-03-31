import { useEffect, useState, useRef } from "react";
import supabase from "../../services/supabase";
import Button from "../../styles/StyledButton";
import Row from "../../styles/Row";
import Message from "./Message";
import styled from "styled-components";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";

const StyledMessageArea = styled.div`
  width: 500px;
`;

function ChatWindow({ chatName }) {
  const channelRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [error, setError] = useState("");

  const { user } = useUser();
  const userName = user?.user_metadata?.username || "Anonymous";

  async function sendMessage(message) {
    if (!message.trim()) return;
    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ text: message, userName }]);
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
      .order("id", { ascending: false })
      .limit(10);

    if (error) {
      setError(error.message);
      return;
    }
    setMessages(data);
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
            console.log("New message received:", payload.new);
            setMessages((prevMessages) => [payload.new, ...prevMessages]);
            console.log("NEW!!", messages);
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

  return (
    <div>
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
    </div>
  );
}

export default ChatWindow;
