"use client";

import { useState, useRef, useEffect } from "react";
import { useCreateMessage } from "@/hooks/useCreateMessage";
import { ChatMessageType } from "@/types";
import { SiOpenai } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import { PiNavigationArrow } from "react-icons/pi";
import { IoSquareOutline } from "react-icons/io5";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { createMessage, isPending } = useCreateMessage(messages);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Automatically scrolls to the last message
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current as HTMLElement;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100dvh-70px)] lg:h-[calc(100dvh-90px)] max-w-4xl mx-auto lg:mx-auto lg:w-full">
      <div
        className="flex-1 text-sm lg:text-base space-y-2 p-4 overflow-y-auto lg:space-y-6 scrollbar"
        ref={messagesContainerRef}
      >
        {/* Welcome message */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <span className="flex size-8 text-white items-center justify-center rounded-full p-1.5 bg-emerald-500">
              <SiOpenai className="size-5" />
            </span>
          </div>
          <div className="chat-bubble lg:py-4 bg-emerald-300/20">
            Hello! How can I assist you today with planning your city adventure?
          </div>
        </div>

        {/* Messages */}
        {messages.map((message, index) => {
          const bgColor = message.role !== "user" && "bg-emerald-300/20";
          const direction = message.role !== "user" ? "chat-start" : "chat-end";
          const avatar =
            message.role === "user" ? (
              // <span className="text-xs font-semibold">YOU</span>
              <FaRegUser className="size-4" />
            ) : (
              <SiOpenai className="size-5" />
            );

          return (
            <div key={index} className={`chat ${direction}`}>
              <div className="chat-image avatar">
                <span
                  className={`flex size-8 text-white items-center justify-center rounded-full p-1.5 ${
                    message.role !== "user" ? "bg-emerald-500" : "bg-gray-500"
                  }`}
                >
                  {avatar}
                </span>
              </div>
              <div className={`${bgColor} chat-bubble leading-normal lg:py-4`}>
                {message.content}
              </div>
            </div>
          );
        })}

        {isPending && <span className="loading mt-4 ml-[38px] text-gray-800"></span>}
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="px-4">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message OpenCity AI"
            className="input input-bordered join-item w-full focus:outline-none placeholder:text-sm"
            value={text}
            // required
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" disabled={isPending || text.length === 0} className="btn join-item">
            {isPending ? (
              <IoSquareOutline className="text-lg" />
            ) : (
              <PiNavigationArrow className="rotate-90 text-xl" />
            )}
          </button>
        </div>

        <p className="text-xs text-center mt-1.5 font-medium">
          OpenCity AI can make mistakes, so it is good to double-check important information.
        </p>
      </form>
    </div>
  );
};

export default Chat;
