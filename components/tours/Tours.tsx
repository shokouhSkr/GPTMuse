"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "@/utils/actions";
import { ToursList } from "@/components";
import { TourType } from "@/types";
import { IoIosSearch } from "react-icons/io";

const Tours = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data: allTours, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  const dataType = allTours as TourType[];
  return (
    <div className="flex flex-col h-[calc(100dvh-70px)] pb-14 max-w-4xl lg:h-auto mx-auto lg:mx-auto lg:w-full">
      <div className="flex-1 text-sm lg:text-base space-y-2 p-6 overflow-y-auto lg:space-y-6">
        <form className="max-w-lg mb-12 mx-auto">
          <div className="join w-full">
            <input
              type="text"
              placeholder="Search for a city or country"
              className="input input-bordered join-item w-full focus:outline-none placeholder:text-sm"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <button
              className="btn btn-primary join-item lowercase"
              type="button"
              disabled={isPending || searchValue.length === 0}
              onClick={() => setSearchValue("")}
            >
              {isPending ? "Wait a sec..." : <IoIosSearch className="text-xl" />}
            </button>
          </div>
        </form>

        {isPending ? <span className="loading"></span> : <ToursList allTours={dataType} />}
      </div>
    </div>
  );
};

export default Tours;
