import { TourCard } from "@/components";
import { TourType } from "@/types";

const ToursList = ({ allTours }: { allTours: TourType[] }) => {
  if (allTours.length === 0) return <h4 className="text-lg ">No tours found...</h4>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {allTours.map((tour) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};
export default ToursList;
