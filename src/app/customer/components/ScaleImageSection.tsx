import React from "react";
import Image from "next/image";
function ScaleImageSection() {
  return (
    <div>
      {" "}
      <div className="w-screen h-[270px] relative group overflow-hidden border-b-[4px] border-b-blue-600">
        <Image
          width={1000}
          height={100}
          className="w-screen h-[270px] object-cover  absolute top-0 left-0 z-0 transform transition-transform group-hover:scale-125 duration-1000"
          src={"/huwsgul.jpg"}
          alt="image"
        ></Image>
        <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 group-hover:opacity-300 z-14">
          <h1 className="text-[24px] text-white font-bold group-hover:scale-125 duration-1000">
            Бүртгүүлэх
          </h1>
        </div>
        <div className="w-full h-full bg-black opacity-0 z-10 group-hover:opacity-30  absolute top-0 left-0 right-0  transition-opacity duration-300 "></div>
      </div>
    </div>
  );
}

export default ScaleImageSection;
