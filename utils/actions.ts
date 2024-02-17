"use server";

import { ChatMessageType, DestinationType, TourType } from "@/types";
import OpenAI from "openai";
import prisma from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createDestinationPlan = ({ city, country }: DestinationType) => {
  // "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","shortparagraph on the stop 3"]
  return `Find a exact ${city} in this exact ${country}.
  If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
  {
    "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["stop name ", "stop name","stop name"]
  }
  }
  "stops" property should include only three stops.
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
};

/******************************************************************/
export const generateChatResponse = async (chatMessages: ChatMessageType[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "you are a helpful assistant" }, ...chatMessages],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    return response.choices[0].message; // {role:'assistant', content:'hello! how can i help you?'}
  } catch (error) {
    return null;
  }
};

// Before we generate tour, we want to check for exciting ones
export const getExistingTour = async ({ city, country }: DestinationType) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city: city,
        country: country,
      },
    },
  });
};

export const generateTourResponse = async ({ city, country }: DestinationType) => {
  const query = createDestinationPlan({ city, country });

  try {
    const response: any = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    // potentially returns a text with error message
    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createNewTour = async (tour: TourType) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm?: string) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });

  return tours;
};
