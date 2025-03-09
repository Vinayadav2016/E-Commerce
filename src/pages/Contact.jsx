import React from "react";
import Title from "../components/Title";
import contactUsImage from "../assests/images/19368.jpg";
import NewsLetterBox from "../components/NewsLetterBox";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={contactUsImage} className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed condimentum, nunc id fermentum pellentesque, velit mauris
            consectetur nunc, sit amet consectetur lectus nisi.
          </p>
          <p className="text-gray-500">
            Tel:
            <a href="tel:123-456-7890" className="text-blue-500">
              (123) 456-7890
            </a>
            <br />
            Email:
            <a href="mailto:info@example.com" className="text-blue-500">
              info@example.com
            </a>
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers At E-commerce
          </p>
          <p className="text-gray-500">
            Learn more about teams and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
