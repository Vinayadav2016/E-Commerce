import React, { useEffect } from "react";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import { Rating } from "../components/Rating";
import Button from "../components/Button";
import SlideInWrapper from "../components/SlideInWrapper";
import NoItemDialog from "../components/NoItemDialog";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const Orders = () => {
  const { data } = useSelector((state) => state.orders);
  const { loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigate("/", { replace: true });
  }, [loggedIn]);
  return (
    <ErrorBoundary errorMsg="Error occurred at Orders Page. You can still access other Pages.">
      <div className="mt-14  py-5 px-4 md:px-8 lg:px-12">
        <Title text1={"MY"} text2={"ORDERS"} className="text-2xl" />
        {data.length === 0 ? (
          <NoItemDialog>NO ORDERS YET</NoItemDialog>
        ) : (
          <div>
            {data.map((order, index) => {
              return Object.values(order.data).map((item) => {
                return (
                  <SlideInWrapper
                    key={index}
                    className="p-4 bg-slate-400 dark:bg-opacity-10 rounded-xl shadow-lg shadow-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3"
                  >
                    <div className="w-full sm:w-1/2 md:w-1/3 flex items-start gap-6">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="size-16 sm:size-20"
                      />
                      <div>
                        <p className="text-xs sm:text-lg font-medium dark:text-gray-300">
                          {item.title}
                        </p>
                        <span className="text-lg font-medium">
                          ${item.price.toFixed(2)}{" "}
                          <span className="pl-3 text-sm dark:text-gray-300">
                            {item.discountPercentage
                              ? ` ( ${item.discountPercentage}% OFF )`
                              : ""}
                          </span>
                        </span>
                        <Rating rating={item.rating} />
                        <div className="text-xs sm:text-base font-medium dark:text-gray-300">
                          Date: {order.date}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex flex-wrap [&>*]:min-w-1/3 justify-between">
                      <div className="flex items-center gap-2">
                        <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                        <p className="text-sm md:text-base">Ready to Ship</p>
                      </div>
                      <div className="text-xs sm:text-lg font-medium dark:text-gray-300">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-xs sm:text-lg font-medium dark:text-gray-300">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </SlideInWrapper>
                );
              });
            })}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Orders;
