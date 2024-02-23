"use server";

import { ChatMessageType, DestinationType, TourType } from "@/types";
import OpenAI from "openai";
import prisma from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createDestinationPlanPrompt = ({ city, country }: DestinationType) => {
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
    const isFirstInteraction = chatMessages.length === 1 && chatMessages[0].role === "system";

    // Prepare the system message with the specified starting phrase if it's the first interaction
    const systemMessage: ChatMessageType = isFirstInteraction
      ? {
          role: "system",
          content:
            "Ready to discover your next travel obsession? Tell me what kind of place or city or country excites you, and I'll curate a personalized itinerary filled with unique experiences.",
        }
      : {
          role: "system",
          content:
            "only answer to this question and relevant questions and greeting and if the question is irrelevant, response with this:Sorry! But I'm just here to help you plan your city adventure and discover amazing spots. If you have any question about that, feel free to ask!",
        };

    const response = await openai.chat.completions.create({
      messages: [systemMessage, ...chatMessages],
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
  const data = prisma.tour.findUnique({
    where: {
      city_country: {
        city: city,
        country: country,
      },
    },
  });

  console.log("city_country", data);
  return data;
};

export const generateTourResponse = async ({ city, country }: DestinationType) => {
  const query = createDestinationPlanPrompt({ city, country });

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
    data: {
      ...tour,
      city: tour.city.toLowerCase(),
      country: tour.country.toLowerCase(),
    },
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

export const getSingleTour = async (tourId: string) => {
  return prisma.tour.findUnique({
    where: {
      id: tourId,
    },
  });
};

export const updateTourImage = async ({
  tourId,
  imageURL,
}: {
  tourId: string;
  imageURL: string;
}) => {
  return prisma.tour.update({
    where: {
      id: tourId,
    },
    data: {
      image: imageURL,
    },
  });
};

// With openai (NOT RECOMMENDED)
// export const generateTourImage = async ({ city, country }: DestinationType) => {
//   try {
//     const tourImage = await openai.images.generate({
//       prompt: `a panoramic view of the ${city} ${country}`,
//       n: 1,
//       size: "512x512",
//     });

//     return tourImage?.data[0]?.url;
//   } catch (error) {
//     return null;
//   }
// };
