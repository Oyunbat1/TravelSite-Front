"use client";
import React from "react";
import { Plane } from "lucide-react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Wallpaper, Ticket } from "lucide-react";
const items = [
  {
    id: 1,
    title: "Тасалбарийн мэдээлэл",
    url: "/admin/ticketInfo",
    icon: Ticket,
  },
  {
    id: 2,
    title: "Газарзүйн мэдээлэл",
    url: "/admin/geographyInfo",
    icon: Wallpaper,
  },
];

function Appsidebar() {
  const router = useRouter();
  const handleLogOut = () => {
    router.push("/login");
  };
  return (
    <div>
      {" "}
      <Sidebar className="fixed bg-white ">
        <SidebarContent className="">
          <SidebarGroup className="px-6 py-9 flex flex-col gap-4 ">
            <div className="flex items-center">
              <SidebarGroupLabel className="text-[24px] text-gray-500 ">
                Oyuka.Travel
              </SidebarGroupLabel>
              <Plane className="text-[30px] text-gray-500" />
            </div>
            <SidebarGroupContent className="mt-[30px]">
              <SidebarMenu>
                {items.map((item) => (
                  <div key={item.id} className="text-gray-400 ">
                    {" "}
                    <SidebarMenuItem>
                      <SidebarMenuButton className="hover:bg-gray-200">
                        <div className="flex items-center gap-2 pt-4 pb-3">
                          <a
                            href={item.url}
                            className="flex items-center gap-3"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>{" "}
            <SidebarGroupContent
              onClick={handleLogOut}
              className="flex items-center w-full h-[40px] mt-[420px] cursor-pointer bg-gray-200 rounded-md hover:bg-gray-100"
            >
              <SidebarGroupLabel className="text-gray-500 text-[14px]">
                Гарах
              </SidebarGroupLabel>
              <LogOut className="w-[15px] text-gray-500 mt-0.5" />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default Appsidebar;
