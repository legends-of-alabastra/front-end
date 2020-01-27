import React from "react";

import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
  // withChatkitOneToOne
} from "@pusher/chatkit-client-react";

const instanceLocator = "v1:us1:5cab4222-c45a-4257-87c1-14dc774f3f24";
const userId = "admin";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5cab4222-c45a-4257-87c1-14dc774f3f24/token"
});

export default function ChatClient() {
  const chat_client = {
    position: 'relative',
    height: '189px',
    marginTop: '5px'
  }

  const chat_textbox = {
    marginTop: '30px',
    color: 'white',
    overflow: 'auto'
  }

  const chat_input = {
    height: '40px',
    position: 'absolute',
    bottom: '-40px',
    background: '#f1dbb1',
    width: '496px'
  }

  return (
    <div style = { chat_client }>
      <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={userId}
      >
        <div style = { chat_textbox }>
          <WelcomeMessage />
        </div>

        <form style = { chat_input }>
          <input 
            type="text"
            value = { this.state.chat }
            onChange = { this.handleChange }
          />
        </form>
      </ChatkitProvider>
    </div>
  );
}

const WelcomeMessage = withChatkit(props => {
  return (
    <div>
      {props.chatkit.isLoading
        ? "Connecting to Chatkit..."
        : `Hello ${props.chatkit.currentUser.name}! You're in the chat and ready to kick some seniors.`}
    </div>
  );
});