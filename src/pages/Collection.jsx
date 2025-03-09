import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
const Collection = () => {
  
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 px-4 sm:px-6 md:px-10 lg:px-14 mt-14">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <IoIosArrowDropdown
            className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          {/* category options */}
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap 2">
              <input
                className="w-3"
                type="checkbox"
                id="all"
                name="category"
                value={"Men"}
              />
              Men
            </p>

            <p className="flex gap 2">
              <input
                className="w-3"
                type="checkbox"
                id="all"
                name="category"
                value={"Women"}
              />
              Women
            </p>
          </div>
        </div>
        {/* sub category filter  */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          {/* category options */}
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap 2">
              <input
                className="w-3"
                type="checkbox"
                id="all"
                name="category"
                value={"TopWear"}
              />
              Top wear
            </p>

            <p className="flex gap 2">
              <input
                className="w-3"
                type="checkbox"
                id="all"
                name="category"
                value={"WinterWear"}
              />
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/* right side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTION"} />
          {/* product sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="price-high">Price (High to low)</option>
            <option value="price-low">Price (Low to high)</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {productList.map(({ id, title, price, thumbnail }) => (
            <Link to={`/product/${id}`} className="hover:scale-110">
              <ProductItem
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail}
                price={price}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
