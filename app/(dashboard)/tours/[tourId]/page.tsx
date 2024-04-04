import { TourInfo } from "@/components";
import { TourType } from "@/types";
import { getSingleTour, updateTourImage } from "@/utils/actions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }: { params: { tourId: string } }) => {
  const tour = (await getSingleTour(params.tourId)) as TourType;

  if (!tour) {
    redirect("/tours");
  }

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  await updateTourImage({ imageURL: tourImage, tourId: tour.id });

  return (
    <div className="flex flex-col h-[calc(100dvh-70px)] max-w-4xl lg:pb-14 lg:h-auto mx-auto lg:mx-auto lg:w-full">
      <div className="flex-1 text-sm lg:text-base space-y-2 p-6 overflow-y-auto lg:space-y-6">
        <Link href="/tours" className="btn lowercase mb-12">
          <IoArrowBack className="text-xl hover:-translate-x-1 transition-all duration-200" />
          <span className="capitalize lg:block hidden">Back to tours</span>
        </Link>

        {tourImage ? (
          <div>
            <Image
              src={tourImage}
              width={450}
              height={450}
              className="rounded-xl shadow-xl mb-16 h-96 w-full max-w-4xl mx-auto lg:h-[30rem] object-cover"
              alt={tour.title}
              priority
            />
          </div>
        ) : null}

        <TourInfo tour={tour} />
      </div>
    </div>
  );
};

export default SingleTourPage;
