import React from "react";
import Chat from "../components/Chat";

function ChatPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        alignItems: "center",
      }}
    >
      <Chat style={{ alignSelf: "center" }} />
    </div>
  );
}
export default ChatPage;
