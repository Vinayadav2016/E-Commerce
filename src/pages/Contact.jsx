import React from "react";
import Title from "../components/Title";
import contactUsImage from "../assests/images/19368.jpg";
import NewsLetterBox from "../components/NewsLetterBox";
import Button from "../components/Button";
import SlideInWrapper from "../components/SlideInWrapper";
const Contact = () => {
  return (
    <div className="mt-14 py-5 px-2 sm:px-4 md:px-8 lg:px-12">
      <Title
        text1={"CONTACT"}
        text2={"US"}
        className="text-4xl justify-center mt-5"
      />
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={contactUsImage}
          className="w-full md:max-w-[480px] rounded-lg shadow-lg shadow-slate-800"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 dark:text-white">
            Our Store
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed condimentum, nunc id fermentum pellentesque, velit mauris
            consectetur nunc, sit amet consectetur lectus nisi.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Tel:
            <a
              href="tel:123-456-7890"
              className="pl-3 text-gray-800 dark:text-white font-semibold "
            >
              (123) 456-7890
            </a>
            <br />
            Email:
            <a
              href="mailto:info@example.com"
              className="pl-3 text-gray-800 dark:text-white font-semibold "
            >
              info@example.com
            </a>
          </p>
          <p className="font-semibold text-xl text-gray-600 dark:text-white">
            Careers At E-commerce
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Learn more about teams and job openings
          </p>
          <Button className="px-6 sm:px-6 md:px-8 lg:px-10">
            Explore Jobs
          </Button>
        </div>
      </div>
      <SlideInWrapper>
        <NewsLetterBox />
      </SlideInWrapper>
    </div>
  );
};

export default Contact;
