import React from "react";
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
function PolicyCard({ text1, text2, child = () => {} }) {
  return (
    <div className="hover:scale-110 transition-scale duration-500 ease-in-out">
      {child({ className: "size-12 m-auto mb-5" })}
      <h3 className="font-semibold">{text1}</h3>
      <p className="text-gray-400">{text2}</p>
    </div>
  );
}
const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center my-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 [&>*]:cursor-context-menu">
      <PolicyCard
        text1={"Easy Exchange Policy"}
        text2={"We offer hassle free exchange policy"}
        child={(props) => <RiExchangeFundsFill {...props} />}
      />
      <PolicyCard
        text1={"7 Days Returns Policy"}
        text2={"No hassle, no questions"}
        child={(props) => <TbTruckReturn {...props} />}
      />
      <PolicyCard
        text1={"Best Customer Support"}
        text2={"We're here to help you with any issues"}
        child={(props) => <BiSupport {...props} />}
      />
    </div>
  );
};

export default OurPolicy;
