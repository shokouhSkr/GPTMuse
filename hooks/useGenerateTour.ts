import { DestinationType } from "@/types";
import { createNewTour, generateTourResponse, getExistingTour } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGenerateTour = () => {
  const queryClient = useQueryClient();

  const {
    data: tour,
    mutateAsync: generateTour,
    isPending,
  } = useMutation({
    mutationFn: async (destination: DestinationType) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ["tours"] }); // get new tours list
        return newTour;
      }

      return toast.error("No matching city found...");
    },
  });

  return { tour, generateTour, isPending };
};
