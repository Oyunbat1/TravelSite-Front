"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "@/constants";
interface FormValues {
  price: string;
  travel_type: string;
  arrival_location: string;
}
interface GeoInfo {
  title: string;
  content: string;
}
const TravelItems = [
  {
    _id: 1,
    name: "Хөвсгөл",
    url: "/huwsgul.jpg",
  },
  {
    _id: 2,
    name: "Тэрхийн цагаан нуур",
    url: "/terkhiintsagaan.png",
  },
  {
    _id: 3,
    name: "Цагаан суварга",
    url: "/Tsagaan-suvarga.jpg",
  },
];
function page() {
  const [keepTickets, setKeepTickets] = useState<FormValues[]>([]);
  const [geoInfo, setGeoInfo] = useState<GeoInfo[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const ticketsRes = await axios.get(`${BASE_URL}/tickets/get`);
        setKeepTickets(ticketsRes.data.created);

        const geoRes = await axios.get(`${BASE_URL}/info/get`);
        setGeoInfo(geoRes.data.created);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );
  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center z-10 bg-slate-200">
        {" "}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full h-screen">
            {TravelItems.map((el) => (
              <CarouselItem key={el._id} className="relative w-full h-screen">
                <Image
                  src={el.url}
                  fill
                  alt={el.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 z-20 flex justify-center items-center">
                  <h2 className="text-white text-[62px] font-bold">
                    {el.name}
                  </h2>
                </div>
                <div className="absolute inset-0 bg-black opacity-40 z-10" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="w-screen h-auto  ">
        <h1 className="text-[32px] font-normal flex justify-center mt-4">
          Манай аялалууд
        </h1>
        <div
          className="flex gap-3 justify-center mt-8 border-b pb-[40px]
        "
        >
          {keepTickets.slice(0, 4).map((el, index) => (
            <div
              className="w-[300px] h-[360px] rounded-md bg-slate-300 flex flex-col shadow-xl hover:shadow-2xl justify-around items-center transform translate-y-0  hover:-translate-y-2 transition-transform duration-300 ease-in-out"
              key={index}
            >
              <h1 className="text-[24px] text-blue-600">
                {el.arrival_location}
              </h1>
              <div className="flex flex-col gap-1">
                {" "}
                <div>
                  Зорчих тээввэр:{" "}
                  <span className="text-blue-600">{el.travel_type}</span>
                </div>
                <div>
                  Аялалын зардал:{" "}
                  <span className="text-blue-600">{el.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen h-[400px] border-b  border-b-blue-600 mb-[20px]  bg-gray-100">
        <div className="grid grid-cols-2 items-center justify-center h-full ">
          <div className=" justify-center items-center border-r border-r-blue-600 h-full p-[20px] flex flex-col hover:bg-gray-200 transition-all">
            <h1 className="text-[32px] mb-[10px] text-blue-600 ">
              Аялагчдын сэтгэгдэл
            </h1>
            <p className="p-[60px]">
              Ерөнхийдөө аялал их сайхан болсон. Аяллын баг их сайхан бүрдэж уур
              амьсгал тун таатай аялсан. Байнга хошигнож байдаг хүнтэй хамт явах
              их сайхан байсан. Зарим нэг зохицуулж болохгүй асуудлуудаас болоод
              аяллын явдал жаахан сунжирсныг эс тооцвол тун таатай байлаа.
              Аяллын хэрэгслүүд болон майхан их тохилог байсан. Аяллын жолооч
              нар болон тогооч гээд бүгд их найрсаг, ажлаа маш сайн хийж байсан.
              Тэр дундаа хээрийн хоол маш гайхалтай амттай байлаа. Би энэхүү
              аяллыг өөрийн найз нөхдөдөө санал болгоно.
            </p>
            <p className="text-blue-600">Аялагч: Steve Potter & Ариунтуяа</p>
          </div>
          <div className=" justify-center items-center flex flex-col  hover:bg-gray-200 h-full transition-all ">
            <h1 className="text-[32px]  text-blue-600">Зорилго</h1>
            <p className="p-[60px]">
              Бидний зорилго нь Монгол орныхоо үзэсгэлэнт, түүх дурсгалт
              газруудыг үзүүлэх, малчин айлын ахуй амьдрал, зан заншлыг жуулчдад
              сурталчилан ойлгуулах, жуулчдын тав тухыг хангах, Монголчуудыгаа
              өөрийн орны үзэсгэлэнт, түүх дурсгалт газруудаар аялуулах,
              гадаадыг орны хөгжил дэвшил зан заншлыг үзүүлэхээс гадна, мэргэжил
              дээшлүүлэх сургалт семинарт хамруулах, үзэсгэлэн, уулзалт гэрээ
              хэлэлцээр хийхэд туслахад зорилго оршино.
            </p>
            <p className="text-blue-600">Аялагч: Балжмаа</p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col items-center justify-center border-b border-b-blue-600">
        <h1 className="text-[32px]">Газарзүйн мэдээлэл</h1>
        <div className="pb-[30px]">
          {geoInfo.map((el, index) => (
            <div key={index}>
              <h1 className="text-[22px] font-bold pl-[40px]">{el.title}</h1>
              <p className="px-[40px]">{el.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-600 h-[80px] w-full mt-[20px] flex text-white justify-center items-center">
        <p>Хөгжүүлэлт хийсэн Оюун-Эрдэнэ.</p>
        <p>Бүх эрх хуулиар хамгаалагдав. 2025.4/24</p>
      </div>
    </div>
  );
}

export default page;
