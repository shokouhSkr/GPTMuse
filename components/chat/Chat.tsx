"use client";

import { useState } from "react";
import { useCreateMessage } from "@/hooks/useCreateMessage";
import { ChatMessageType } from "@/types";
import { SiOpenai } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import { PiNavigationArrow } from "react-icons/pi";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { createMessage, isPending } = useCreateMessage(messages);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query: ChatMessageType = { role: "user", content: text };
    createMessage(query, {
      onSuccess: (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      },
    });

    setMessages((prevMessages) => [...prevMessages, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] grid grid-rows-[1fr,auto] max-w-4xl lg:mx-auto lg:w-full">
      <div>
        {/* Welcome message */}
        <div className="bg-base-100 flex py-6 px-8 leading-loose border-b border-base-300">
          <span className="mr-4 flex items-center">
            <SiOpenai className="size-4" />
          </span>
          <p className="max-w-3xl">
            Ready to discover your next travel obsession? Tell me what kind of city excites you, and
            I'll curate a personalized itinerary filled with unique experiences.
          </p>
        </div>

        {messages.map((message, index) => {
          const bgColor = message.role === "user" ? "" : "bg-base-100";
          const avatar =
            message.role === "user" ? (
              <FaRegUser className="size-4" />
            ) : (
              <SiOpenai className="size-4" />
            );

          return (
            <div
              key={index}
              className={`${bgColor} flex py-6 px-8 leading-loose border-b border-base-300`}
            >
              <span className="mr-4 flex items-center">{avatar}</span>
              <p className="max-w-3xl">{message.content}</p>
            </div>
          );
        })}

        {isPending && <span className="loading mt-8"></span>}
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

          <button type="submit" disabled={isPending} className="btn join-item">
            <PiNavigationArrow className={`${isPending && "text-gray-500"} text-2xl rotate-90`} />
          </button>
        </div>
      </form>

      <p className="text-xs text-center mt-1.5 font-medium">
        OpenCity AI can make mistakes, so it's good to double-check important information.
      </p>
    </div>
  );
};

export default Chat;
