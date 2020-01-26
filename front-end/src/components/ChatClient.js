import React from "react";
import styled from "styled-components";
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
  withChatkitOneToOne
} from "@pusher/chatkit-client-react";

const instanceLocator = "v1:us1:5cab4222-c45a-4257-87c1-14dc774f3f24";
const userId = "admin";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5cab4222-c45a-4257-87c1-14dc774f3f24/token"
});

export default function ChatClient() {
  return (
    <Chat_Client>
      <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={userId}
      >
        <ChatTextBox>
          <WelcomeMessage />
        </ChatTextBox>

        <ChatInput />
      </ChatkitProvider>
    </Chat_Client>
  );
}

const WelcomeMessage = withChatkit(props => {
  return (
    <div>
      {props.chatkit.isLoading
        ? "Connecting to Chatkit..."
        : `Hello ${props.chatkit.currentUser.name}! Connected to the bitch ass chat server.`}
    </div>
  );
});

// Styles

const Chat_Client = styled.div`
  position: relative;
  height: 189px;
  margin-top: 5px;
`;

const ChatTextBox = styled.div`
  color: white;
  overflow: auto;
`;

const ChatInput = styled.div`
  height: 40px;
  position: absolute;
  bottom: -40px;
  background: #f1dbb1;
  width: 496px;
`;
