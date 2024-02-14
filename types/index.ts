export type ChatMessageType = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type DestinationType = {
  city: string;
  country: string;
};

export type TourType = {
  id: string;
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
  image?: string;
};
