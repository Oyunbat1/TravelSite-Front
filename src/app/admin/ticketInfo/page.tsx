"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import BASE_URL from "@/constants";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const travel_typeData = [
  { id: 1, name: "автобус" },
  { id: 2, name: "онгоц" },
  { id: 3, name: "галт тэрэг" },
];
interface FormValues {
  price: string;
  travel_type: string;
  arrival_location: string;
}
export default function Page() {
  const [price, setPrice] = useState("");
  const [travel_type, setTravel_type] = useState("");
  const [arrival_location, setArrival_location] = useState("");
  const [ticket, setTickets] = useState<FormValues[]>([]);
  const [successMessageTicket, setSuccessMessageTicket] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tickets`);
      const data = await response.json();
      setTickets(data.created);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAddTicket = async () => {
    if (!travel_type || !price || !arrival_location) return;

    try {
      const response = await fetch(`${BASE_URL}/tickets/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: price,
          arrival_location: arrival_location,
          travel_type: travel_type,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      setArrival_location(""), setPrice(""), setTravel_type("");
      setSuccessMessageTicket("New ticket is being added ");
      setTimeout(() => setSuccessMessageTicket(""), 2000);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };
  return (
    <div>
      {successMessageTicket && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 flex gap-2">
          {successMessageTicket}
        </div>
      )}
      <div className="w-[1200px] h-auto bg-white z-30 items-center justify-center p-4 rounded-xl mt-[20px] ml-[30px]">
        <h1 className="text-center text-[22px] pt-[20px]">
          Тасалбарын мэдээлэл оруулах
        </h1>
        <form className="p-[20px]">
          <div className="flex  flex-col  gap-4 items-center">
            <div className="flex gap-4">
              {" "}
              <div className="flex flex-col gap-1">
                <Label htmlFor="travel_type">Аялалын төрөлөө оруулна уу</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[300px]">
                      {travel_type || "Аялалын төрөл сонгох"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-74 bg-white">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <div className="flex flex-col items-center gap-4 justify-center">
                          {travel_typeData.map((el) => (
                            <div
                              onClick={() => setTravel_type(el.name)}
                              className="border-b-1 hover:border-b-1 hover:border-black"
                              key={el.id}
                            >
                              {el.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="arrival_location">Байршил оруулах</Label>
                <Input
                  className="focus-visible:ring-0 w-[400px]"
                  placeholder="Аялалын байршил"
                  onChange={(el) => setArrival_location(el.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Тасалбарын үнэ</Label>
                <Input
                  className="focus-visible:ring-0 w-[400px]"
                  placeholder="Аялалын үнэ"
                  onChange={(el) => setPrice(el.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-[200px] bg-blue-400 text-white"
              onClick={handleAddTicket}
            >
              Илгээх
            </Button>
          </div>
        </form>
        <div>
          <div className="flex justify-around pb-2 font-semibold">
            <h1>Аялалын төрөл</h1>
            <h1>Тасалбарын үнэ</h1>
            <h1>Байршил</h1>
          </div>

          {ticket.map((el, index) => (
            <div key={index} className="flex border-t-2 p-2 justify-around">
              <div className="w-[100px]">{el.travel_type}</div>
              <div className="w-[100px]">{el.price}</div>
              <div className="w-[200px]">{el.arrival_location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
