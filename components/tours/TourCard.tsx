import { TourType } from "@/types";
import Link from "next/link";
import { DirectionAwareHover } from "..";

const TourCard = ({ tour }: { tour: TourType }) => {
  const { id, city, country, image } = tour;

  return (
    <Link href={`/tours/${id}`} className="card card-compact rounded-xl bg-base-100">
      <div className="relative flex items-center justify-center">
        <DirectionAwareHover imageUrl={image!!}>
          <p className="font-bold text-xl">The city of {city}</p>
          <p className="font-normal text-sm">In {country}</p>
        </DirectionAwareHover>
      </div>
    </Link>
  );
};

export default TourCard;
