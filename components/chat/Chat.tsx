"use client";

import { useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<String[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(text);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] grid grid-rows-[1fr,auto] max-w-4xl lg:mx-auto lg:w-full">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>

      <form onSubmit={handleSubmit} className="pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full focus:outline-none"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" className="btn join-item">
            ask question
          </button>
        </div>
      </form>

      <p className="text-xs text-center mt-1.5 font-medium">
        GPTMuse can make mistakes, so it's good to double-check important information.
      </p>
    </div>
  );
};

export default Chat;
