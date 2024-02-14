import { ChatMessageType } from "@/types";
import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateMessage = (messages: ChatMessageType[]) => {
  const { mutate: createMessage, isPending } = useMutation({
    mutationFn: (query: ChatMessageType) => generateChatResponse([...messages, query]),

    onSuccess: (data: any) => {
      if (!data) return toast.error("Something went wrong!");
    },
  });

  return { createMessage, isPending };
};
