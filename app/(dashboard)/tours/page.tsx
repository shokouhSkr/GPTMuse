import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Tours } from "@/components";
import { getAllTours } from "@/utils/actions";

const ToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours", ""], // second one is the default value in the "search"
    queryFn: () => getAllTours(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Tours />
    </HydrationBoundary>
  );
};

export default ToursPage;
