import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import SlideInWrapper from "../components/SlideInWrapper";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = () => {
  return (
    <ErrorBoundary errorMsg="Error occurred at Home Page. You can still access other Pages.">
      <div className="mt-14 w-full">
        <Hero />
        <SlideInWrapper>
          <LatestCollection />
        </SlideInWrapper>
        <div className="px-4 sm:px-6 md:px-10 lg:px-14">
          <SlideInWrapper>
            <OurPolicy />
          </SlideInWrapper>

          <SlideInWrapper>
            <NewsLetterBox />
          </SlideInWrapper>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
