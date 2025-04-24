"use client";
import React from "react";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToHomePage = () => {
    router.push("/customer");
  };
  const handleToCustomerRegistration = () => {
    router.push("/customer/registration");
  };
  return (
    <div>
      <div
        className={`fixed right-0 left-0 top-0 h-[80px] transition-colors duration-500 z-20 ${
          scrolled ? "bg-black opacity-40" : "bg-white opacity-30"
        }`}
      ></div>
      <div className="fixed right-0 left-0 top-0 h-[80px] transparent flex justify-around items-center z-20">
        <div className="flex items-center gap-1" onClick={handleToHomePage}>
          <h1 className="text-[32px] font-bold text-white cursor-pointer">
            {" "}
            Oyun
          </h1>
          <Plane className="text-[32px] mt-1 text-white" />
        </div>
        <nav>
          <ul className="flex gap-[40px] text-[18px]">
            <li className="relative group">
              <a
                href="#"
                className="inline-block transition-colors duration-300 text-white"
              >
                Мэдээлэл
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li
              className="relative group"
              onClick={handleToCustomerRegistration}
            >
              <a
                href="#"
                className="inline-block transition-colors duration-300 text-white"
              >
                Аялалд бүртгүүлэх
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
