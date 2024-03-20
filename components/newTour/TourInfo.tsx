import { TourType } from "@/types";

const TourInfo = ({ tour }: { tour: TourType }) => {
  const { title, description, stops, image } = tour;

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4 dark:text-[#949eb2]">{title}</h1>
      <p className="leading-loose mb-6 dark:text-[#949eb2]">{description}</p>
      <ul>
        {stops?.map((stop) => {
          return (
            <li key={stop} className="mb-4 bg-base-200 p-4 rounded-xl">
              <p className="text">{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TourInfo;
