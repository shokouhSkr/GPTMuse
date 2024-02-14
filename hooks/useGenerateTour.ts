import { DestinationType } from "@/types";
import { generateTourResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGenerateTour = () => {
  const {
    data: tour,
    mutateAsync: generateTour,
    isPending,
  } = useMutation({
    mutationFn: async (destination: DestinationType) => {
      const newTour = await generateTourResponse(destination);

      if (newTour) return newTour;
      return toast.error("No matching city found...");
    },
  });

  return { tour, generateTour, isPending };
};
