"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import BASE_URL from "@/constants";
import { useState, useEffect } from "react";
import React from "react";

interface FormValues {
  _id: number;
  price: string;
  travel_type: string;
  arrival_location: string;
  travel_image: string;
  travel_detail: string;
  travel_distance: string;
  zoneName: string;
}

function Page() {
  const [ticket, setTicket] = useState<FormValues | null>(null);
  console.log(ticket);
  const { placeID } = useParams();

  useEffect(() => {
    const fetchTicketById = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/zoning/withProvinces`);
        const zones = res.data?.zoningCategories;

        if (!Array.isArray(zones)) {
          console.error("zones is not an array:", zones);
          return;
        }

        // Flatten all tickets from all zones
        const allTickets: FormValues[] = zones.flatMap(
          (zone: any) => zone.tickets || []
        );

        // Find the ticket by ID
        const foundTicket = allTickets.find(
          (item) => String(item._id) === String(placeID)
        );

        setTicket(foundTicket || null);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      }
    };

    fetchTicketById();
  }, [placeID]);

  return (
    <div className="w-screen h-screen bg-slate-400 p-6 text-white flex justify-center items-center">
      {ticket ? (
        <div className="w-[300px] h-[400px] bg-white p-4 rounded shadow-xl mt-[100px] flex relative">
          <div>
            {" "}
            <img
              src={`data:image/png;base64,${ticket.travel_image}`}
              alt={ticket.arrival_location}
              className="w-[300px] h-full object-cover rounded opacity-30"
            />
            <div className="absolute top-[40px] left-[55px]">
              {" "}
              <h1 className="text-4xl font-normal mt-4 text-gray-600 mb-[80px]">
                {ticket.arrival_location}
              </h1>
              <p className="text-xl text-black mt-2">
                Аялалын төрөл:{" "}
                <span className="text-blue-600">{ticket.travel_type}</span>
              </p>
              <p className="text-lg text-black mt-1">
                Үнэ: <span className="text-blue-600">{ticket.price}₮</span>
              </p>
              <p className="text-lg text-black mt-1">
                Км:{" "}
                <span className="text-blue-600">{ticket.travel_distance}</span>
              </p>
            </div>
          </div>
          <div>
            {/* <p className="text-xl text-black">{ticket.travel_detail}</p> */}
          </div>
        </div>
      ) : (
        <p className="text-xl text-white">
          Тасалбарын мэдээлэл ачааллаж байна...
        </p>
      )}
    </div>
  );
}

export default Page;
