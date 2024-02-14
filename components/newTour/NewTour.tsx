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

  console.log("tour: ", tour);

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>

        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full focus:outline-none"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full focus:outline-none"
            placeholder="country"
            name="country"
            required
          />

          <button type="submit" className="btn btn-primary join-item bg-gray-200">
            generate tour
          </button>
        </div>
      </form>

      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};

export default NewTour;
