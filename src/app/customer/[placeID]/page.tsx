"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
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
}

function Page() {
  const [keepTickets, setKeepTickets] = useState<FormValues[]>([]);
  const { placeID } = useParams();
  const selectedPlace = keepTickets.find(
    (item) => String(item._id) === placeID
  );
  console.log("Selected Place:", selectedPlace);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const ticketsRes = await axios.get(`${BASE_URL}/tickets/get`);
        setKeepTickets(ticketsRes.data.created);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-400 p-6 text-white">
      {selectedPlace ? (
        <div className="w-[800px] h-[600px] bg-white p-4 rounded mt-[100px]">
          <img
            src={`data:image/png;base64,${selectedPlace.travel_image}`}
            alt={selectedPlace.arrival_location}
            className="w-[400px] h-48 object-cover rounded"
          />
          <h1 className="text-2xl font-bold mt-4 text-black">
            {selectedPlace.arrival_location}
          </h1>
          <p className="text-lg text-black">Price: {selectedPlace.price}</p>
          <p className="text-sm text-black">
            Type: {selectedPlace.travel_type}
          </p>
        </div>
      ) : (
        <p className="mt-[100px]">Уншиж байна...</p>
      )}
    </div>
  );
}

export default Page;
