import React from "react";
import Title from "../components/Title";
import aboutUsImage from "../assests/images/19368.jpg";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={aboutUsImage} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            quaerat eum nisi aliquid voluptate optio temporibus libero, alias
            veritatis odio quae aperiam nesciunt rerum cupiditate. Esse quod
            vitae odit ducimus. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vero consequatur, totam officiis illum, sequi
            dolorem impedit numquam quibusdam eligendi sit voluptates amet ab
            est, dolorum rem pariatur enim deserunt! Maiores.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            est perferendis autem perspiciatis soluta, aliquam repellat mollitia
            culpa rem error, laborum non fugiat dolorum dolorem cupiditate
            possimus ipsa provident maxime.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            incidunt cupiditate illo, quo cum esse consequuntur dolores ipsum
            fugiat blanditiis, explicabo numquam at ullam. Eligendi totam odit
            consequuntur perspiciatis? Iusto.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            recusandae eum, sunt, est perferendis asperiores, earum rerum
            mollitia iure ipsum dignissimos at? Reprehenderit, numquam ut
            explicabo nesciunt quae commodi corporis.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            recusandae eum, sunt, est perferendis asperiores, earum rerum
            mollitia iure ipsum dignissimos at? Reprehenderit, numquam ut
            explicabo nesciunt quae commodi corporis.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            recusandae eum, sunt, est perferendis asperiores, earum rerum
            mollitia iure ipsum dignissimos at? Reprehenderit, numquam ut
            explicabo nesciunt quae commodi corporis.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
