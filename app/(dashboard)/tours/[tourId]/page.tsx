import { TourInfo } from "@/components";
import { TourType } from "@/types";
import { getSingleTour } from "@/utils/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const SingleTourPage = async ({ params }: { params: { tourId: string } }) => {
  const tour = await getSingleTour(params.tourId);

  if (!tour) {
    redirect("/tours");
  }

  const tourType = tour as TourType;
  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>

      <TourInfo tour={tourType} />
    </div>
  );
};

export default SingleTourPage;
