import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  resetProducts,
  selectCategory,
  sortByOptions,
  sortProducts,
} from "../store/productsSlice";
import SlideInWrapper from "../components/SlideInWrapper";
import { ModalWrapper } from "../modal/ModalWrapper";
import CategoryListModal from "../modal/CategoryListModal";

const Category = ({
  key,
  selectedCategory,
  category,
  handleCategoryChange,
}) => {
  console.log(
    selectedCategory === category,
    " selected category ",
    selectedCategory,
    category
  );
  return (
    <div
      key={key}
      onClick={() => handleCategoryChange(category)}
      className={
        "uppercase w-1/2 p-2 py-3 sm:w-full dark:text-gray-200 rounded-md transition-all duration-300 ease-in-out " +
        (selectedCategory === category
          ? "bg-slate-400 dark:bg-slate-800 shadow-lg shadow-slate-800 text-white"
          : "hover:text-white hover:bg-slate-400 hover:dark:bg-slate-800 hover:shadow-lg hover:shadow-slate-800")
      }
    >
      {category}
    </div>
  );
};

const CategoryList = ({
  categoryList = [],
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="w-full flex flex-wrap sm:flex-nowrap sm:flex-col sm:gap-2 font-semibold text-xs sm:text-sm [&>*]:cursor-pointer">
      <Category
        key={-1}
        selectedCategory={selectedCategory}
        category="All"
        handleCategoryChange={handleCategoryChange}
      />
      {categoryList.map((category, index) => {
        return (
          <Category
            key={index}
            selectedCategory={selectedCategory}
            category={category}
            handleCategoryChange={handleCategoryChange}
          />
        );
      })}
    </div>
  );
};

const FilterContainer = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const {
    selectedCategory,
    categories: categoryList,
    isLoading,
    error,
    selectedSort,
  } = useSelector((state) => state.products);
  function handleCategoryChange(category) {
    if (showFilter) setShowFilter(false);
    dispatch(selectCategory(category));
    dispatch(resetProducts());
    dispatch(
      fetchData({
        skip: 0,
        ...selectedSort.value,
        category: category,
      })
    );
  }

  return (
    <div className="min-w-56 w-full sm:w-1/3 md:w-1/5 flex flex-col items-stretch">
      <p className="w-full pl-4 hidden sm:block text-lg font-semibold text-gray-600 dark:text-gray-200">
        PRODUCT CATEGORIES
      </p>
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="w-full sm:hidden text-lg flex items-center justify-between cursor-pointer gap-2 p-3 font-semibold bg-slate-400 rounded-lg shadow-lg shadow-slate-800 dark:bg-slate-800 text-white animate-slide-in"
      >
        PRODUCT CATEGORIES
        <IoIosArrowDropdown
          className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
        />
      </p>
      {/* category filter */}

      <div className={`pl-4 mt-6 hidden sm:block`}>
        <CategoryList
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      {showFilter && (
        <ModalWrapper closeModal={() => setShowFilter(false)}>
          <CategoryListModal closeModal={() => setShowFilter(false)}>
            <CategoryList
              categoryList={categoryList}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </CategoryListModal>
        </ModalWrapper>
      )}
    </div>
  );
};
const ProductList = ({ productList, isLoading, lastProductElementRef }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 grid-auto-rows-[1fr]">
      {productList.map(
        (
          { id, title, price, thumbnail, rating, discountPercentage },
          index
        ) => {
          return (
            <SlideInWrapper key={id}>
              <Link
                ref={
                  index === productList.length - 1
                    ? lastProductElementRef
                    : null
                }
                to={`/product/${id}`}
                className="hover:scale-110 transition-all duration-500 ease-in-out flex justify-center h-full"
              >
                <ProductItem
                  key={id}
                  id={id}
                  title={title}
                  thumbnail={thumbnail}
                  price={price}
                  rating={rating}
                  discountPercentage={discountPercentage}
                />
              </Link>
            </SlideInWrapper>
          );
        }
      )}

      {isLoading && (
        <div className="flex justify-center">
          <ProductItem isLoading />
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center">
          <ProductItem isLoading />
        </div>
      )}
    </div>
  );
};
const SortByOption = ({ option, setShowOptions }) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.products);
  return (
    <div
      className="hover:text-white hover:bg-slate-400 dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-800 rounded-lg p-2 cursor-pointer my-2"
      onClick={() => {
        dispatch(sortProducts(option));
        dispatch(resetProducts());
        dispatch(
          fetchData({
            skip: 0,
            ...option.value,
            category: selectedCategory,
          })
        );
        setShowOptions(false);
      }}
      value="price-high"
    >
      {option.name}
    </div>
  );
};

const SortByContainer = ({ selectedSort }) => {
  const [showOptions, setShowOptions] = useState(false);
  console.log(selectedSort, "selected sort");
  return (
    <div className="group w-full md:w-1/4 min-w-[200px] relative flex flex-col p-3 bg-slate-400 dark:bg-slate-800 dark:text-gray-200 font-semibold text-md  shadow-lg shadow-slate-800 text-sm rounded-lg ">
      <div
        className="flex items-center justify-between text-gray-800 dark:text-white cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedSort.name === "None" ? "Sort By" : selectedSort.name}{" "}
        <IoIosArrowDropdown className={showOptions ? "rotate-180" : " "} />
      </div>
      {showOptions && (
        <div className="absolute z-10 top-[110%] left-0 w-full bg-gray-200 rounded-lg shadow-lg shadow-slate-800 dark:bg-slate-600 animate-slide-in">
          {sortByOptions.map((option, index) => {
            return (
              <SortByOption
                key={index}
                option={option}
                setShowOptions={setShowOptions}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Collection = () => {
  const dispatch = useDispatch();
  const observer = useRef();
  const {
    isLoading,
    error,
    list: productList,
    selectedCategory,
    selectedSort,
    hasMore = true,
  } = useSelector((state) => state.products);
  console.log(productList, "product list in collection");
  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect(); // disconnect the previous observer
      // check if the element is on screen and visible on the page, if yes then call fetch for more data
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            fetchData({
              skip: productList.length,
              ...selectedSort.value,
              category: selectedCategory,
            })
          );
        }
      });
      if (node) observer.current.observe(node); // if the node exist updating the observer to current node
    },
    [isLoading, hasMore]
  );
  return (
    <div className="min-h-dvh flex flex-col sm:flex-row gap-5 sm:gap-10 mt-14 pt-8 p-4 sm:pr-4 md:pr-8 lg:pr-12">
      {/* filter options */}
      <FilterContainer />
      {/* right side  */}

      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center text-2xl mb-4 font-semibold">
          <Title text1={"All"} text2={"COLLECTION"} />
          {/* product sort */}
          <SortByContainer selectedSort={selectedSort} />
        </div>
        {/* map products */}
        <ProductList
          productList={productList}
          isLoading={isLoading}
          lastProductElementRef={lastProductElementRef}
        />
      </div>
    </div>
  );
};

export default Collection;
