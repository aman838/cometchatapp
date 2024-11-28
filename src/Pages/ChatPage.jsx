import { CometChat } from "@cometchat-pro/chat";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_ID, REGION, AUTH_KEY } from "../utils/utils";

const ChatPage = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.loggedUser.loggedUser);

  const fetchMessageHistory = (receiverId) => {
    const limit = 50; // Number of messages to fetch
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(receiverId) // Set the receiver's user ID (UID)
      .setLimit(limit) // Set the limit for the number of messages
      .build();

    console.log(messagesRequest, "messagesRequest");

    messagesRequest.fetchPrevious().then(
      (fetchedMessages) => {
        if (fetchedMessages.length === 0) {
          console.log("No messages found.");
        } else {
          console.log("Fetched messages:", fetchedMessages);
          setMessages(fetchedMessages);
        }
      },
      (error) => {
        console.log("Error fetching messages:", error);
      }
    );
  };

  const initCometChat = () => {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(REGION)
      .build();

    CometChat.init(APP_ID, appSetting).then(
      () => {
        if (CometChat.isInitialized()) {
          console.log("CometChat initialized successfully.");
        }
      },
      (error) => {
        console.log("CometChat initialization failed with error:", error);
      }
    );
  };

  const addMessageListener = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (mess) => {
          ReceiveMessage(mess);
        },
      })
    );
  };

  const ReceiveMessage = (receivedMessage) => {
    console.log(receivedMessage, "receivedMessage", messages, "messages");
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(
        (msg) => msg.id === receivedMessage.id
      );
      if (!messageExists) {
        return [...prevMessages, receivedMessage];
      }
      return prevMessages;
    });
  };

  const loginCometChatUser = (uid) => {
    CometChat.login(uid, AUTH_KEY).then(
      (user) => {
        console.log("Login successful:", user);
        addMessageListener("messageListener");
        fetchMessageHistory(params.id);
      },
      (error) => {
        console.log("Login failed with error:", error);
      }
    );
  };

  const sendMessage = (receiverID, messageText, receiverType) => {
    const textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        console.log("Message sent successfully:", message);
        return message;
      },
      (error) => {
        console.log("Message sending failed with error:", error);
      }
    );
  };

  const handleSendMessage = () => {
    const currentTimeInMilliseconds = Math.floor(Date.now() / 1000);
    sendMessage(params.id, message, CometChat.RECEIVER_TYPE.USER);
    setMessages([
      ...messages,
      {
        sentAt: currentTimeInMilliseconds,
        text: message,
        sender: {
          name: user.name,
          uid: user.cometChatId,
        },
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    initCometChat();
    loginCometChatUser(user.cometChatId);
    return () => {
      CometChat.removeMessageListener("messageListener");
    };
  }, [params.id]);

  return (
    <div className="chat_Container">
      <div>
        ChatPage {user.cometChatId} {user.name}
      </div>

      <div className="chat-container">
        {messages.map((message, index) => {
          const isSentByUser = message.sender.uid === user.cometChatId;
          return (
            <>
              {" "}
              <div
                key={index}
                className={`message-wrapper ${
                  isSentByUser ? "sent" : "received"
                }`}
              >
                <div
                  className={`message ${
                    isSentByUser ? "sent-message" : "received-message"
                  }`}
                >
                  <p className="message-text">{message.text}</p>
                  <p className="message-time">
                    {new Date(message.sentAt * 1000).toLocaleTimeString()}
                  </p>
                  <div>{<p>{message.sender.name}</p>}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="input_container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
