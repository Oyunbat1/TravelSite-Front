import React from "react";
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
    title: "Газарзүйн мэдээлэл",
    url: "/admin/geographyInfo",
    icon: Wallpaper,
  },
  {
    id: 2,
    title: "Тасалбарийн мэдээлэл",
    url: "/admin/ticketInfo",
    icon: Ticket,
  },
];

function Appsidebar() {
  return (
    <div>
      {" "}
      <Sidebar className="fixed bg-white">
        <SidebarContent>
          <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
            <SidebarGroupLabel className="text-[24px]">
              Oyuka.Travel
            </SidebarGroupLabel>
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
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default Appsidebar;
