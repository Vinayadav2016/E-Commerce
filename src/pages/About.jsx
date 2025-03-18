import React from "react";
import Title from "../components/Title";
import aboutUsImage from "../assests/images/19368.jpg";
import NewsLetterBox from "../components/NewsLetterBox";
import SlideInWrapper from "../components/SlideInWrapper";

const ReasonDialog = ({ heading, reason }) => {
  return (
    <div className="shadow-lg shadow-slate-800 p-5 flex flex-col gap-5 bg-slate-400 dark:bg-opacity-20 rounded-xl">
      <b className="text-lg dark:text-white">{heading}</b>
      <p className="text-base font-medium text-gray-600 dark:text-gray-300">
        {reason}
      </p>
    </div>
  );
};
const About = () => {
  return (
    <div className="mt-14 py-5 px-2 sm:px-4 md:px-8 lg:px-12">
      <Title
        text1={"ABOUT"}
        text2={"US"}
        className="text-4xl justify-center mt-5"
      />
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] shadow-lg shadow-slate-800 rounded-lg"
          src={aboutUsImage}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-base text-gray-600 dark:text-gray-300 font-medium ">
            Welcome to FILPZON, where quality meets convenience! We are
            passionate about bringing you the best products at unbeatable
            prices, making shopping effortless, enjoyable, and rewarding.
          </p>
          <div>
            <b className="text-gray-800 dark:text-white">Who We Are</b>
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
              At FLIPZON, we believe in exceptional quality, affordability, and
              customer satisfaction. Our team is dedicated to curating a diverse
              selection of products—from fashion and electronics to home
              essentials and lifestyle must-haves.
            </p>
          </div>
          <div>
            <b className="text-gray-800 dark:text-white">Our Mission</b>
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
              Our goal is simple:
              <br /> ✅ Premium Products – We handpick top-quality items that
              cater to your everyday needs.
              <br />✅ Seamless Shopping – A hassle-free shopping experience
              with secure payments and fast delivery.
              <br />✅ Customer First – Your satisfaction is our priority, and
              we’re here to assist you every step of the way.
            </p>
          </div>
        </div>
      </div>
      <SlideInWrapper>
        <Title text1={"WHY"} text2={"US"} className="text-4xl py-4" />
        <div className="flex flex-col md:flex-row text-sm mb-20 gap-5">
          <ReasonDialog
            heading="Quality Assurance:"
            reason="We believe in offering only the best for our customers. Every product in our collection goes through a strict quality check to ensure durability, reliability, and value for money. Whether it's fashion, electronics, or home essentials, we bring you top-notch items from trusted suppliers and brands."
          />
          <ReasonDialog
            heading="Convenience:"
            reason="We strive to make shopping easy and enjoyable for our customers. Our convenient store layout, easy-to-use checkout process, and our friendly staff are all designed to make shopping a pleasant experience. We believe that every customer deserves a hassle-free shopping experience."
          />
          <ReasonDialog
            heading="Customer Satisfaction:"
            reason="We believe in creating a positive customer experience. We strive to provide our customers with excellent service, helpful staff, and a friendly atmosphere. We believe that every customer should feel valued and appreciated, and we're committed to making that happen."
          />
        </div>
      </SlideInWrapper>
      <SlideInWrapper>
        <NewsLetterBox />
      </SlideInWrapper>
    </div>
  );
};

export default About;
