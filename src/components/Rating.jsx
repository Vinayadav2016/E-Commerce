import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
export const Rating = ({ rating }) => {
  let tempRating = rating || 0;
  return (
    <div className="flex items-center gap-1 ">
      {[...Array(5)].map((_, index) => {
        console.log(
          " rating out of five ",
          index,
          " index ",
          tempRating - index
        );
        return (
          <div className="relative" key={index}>
            {tempRating - index >= 1 ? (
              <IoMdStar className="text-slate-800 dark:text-yellow-400" />
            ) : tempRating - index >= 0.5 ? (
              <IoMdStarHalf className="text-slate-800 dark:text-yellow-400" />
            ) : (
              <IoMdStarOutline className="text-slate-800 dark:text-yellow-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};
