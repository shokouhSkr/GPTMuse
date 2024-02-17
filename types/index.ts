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
  createdAt: Date;
  updatedAt: Date;
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
  image?: string;
};
