"use client";

import { TourInfo } from "@/components";
import { useGenerateTour } from "@/hooks/useGenerateTour";
import { DestinationType } from "@/types";

const NewTour = () => {
  const { tour, generateTour, isPending } = useGenerateTour();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // When we have multi inputs, good to use formData instead of controlled inputs
    const formData = new FormData(e.currentTarget);
    // Get all inputs in one object
    const destination = Object.fromEntries(formData.entries()) as DestinationType;

    generateTour(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-70px)] pb-14 max-w-4xl lg:h-[calc(100dvh-90px)] mx-auto lg:w-full">
      <div className="flex-1 text-sm lg:text-base space-y-2 p-4 overflow-y-auto lg:space-y-6">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-12">
          <h2 className="mb-4">Select your dream destination</h2>

          <div className="join w-full">
            <input
              type="text"
              className="input input-bordered placeholder:text-sm join-item w-full focus:outline-none"
              placeholder="city"
              name="city"
              required
            />
            <input
              type="text"
              className="input input-bordered placeholder:text-sm join-item w-full focus:outline-none"
              placeholder="country"
              name="country"
              required
            />

            <button type="submit" className="btn btn-primary join-item lowercase bg-gray-200">
              generate tour
            </button>
          </div>
        </form>

        <div className="mt-16 max-w-4xl mx-auto">{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </div>
  );
};

export default NewTour;
