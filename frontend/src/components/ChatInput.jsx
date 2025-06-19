import { useState } from "react";
import { askGemini } from "../lib/api"; // ⭐ NEW
// import { v4 as uuid } from "uuid";             // only if you need ids

function ChatInput({ onSend, addLocalMessage }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    // 1️⃣ AI shortcut — user types “@ai …”
    if (text.startsWith("@ai")) {
      const prompt = text.replace(/^@ai\s*/i, "");
      addLocalMessage({
        _id: uuid(),
        text: "Thinking…",
        sender: { username: "Gemini AI" },
        isAi: true,
      });

      try {
        const aiText = await askGemini(prompt);
        addLocalMessage({
          _id: uuid(),
          text: aiText,
          sender: { username: "Gemini AI" },
          isAi: true,
        });
      } catch {
        addLocalMessage({
          _id: uuid(),
          text: "⚠️  AI is unavailable right now.",
          sender: { username: "System" },
          isAi: true,
        });
      }
    } else {
      // 2️⃣ normal user message
      onSend(text);
    }

    setText("");
  };

  return (
    <div className="chat-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type a message — try "@ai tell me a joke"'
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatInput;
