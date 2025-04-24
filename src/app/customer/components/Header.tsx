import React from "react";
import { Plane } from "lucide-react";
function Header() {
  return (
    <div className="fixed right-0 left-0 top-0 h-[80px] bg-white flex justify-around items-center z-20">
      <div className="flex items-center gap-1">
        <h1 className="text-[32px] font-bold text-gray-500 cursor-pointer">
          {" "}
          Oyun
        </h1>
        <Plane className="text-[32px] mt-1  text-gray-500" />
      </div>
      <nav>
        <ul className="flex gap-[40px] text-[18px]">
          <li className="relative group">
            <a href="#" className="inline-block transition-colors duration-300">
              Мэдээлэл
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="relative group">
            <a href="#" className="inline-block transition-colors duration-300">
              Бүртгэл
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
