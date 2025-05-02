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
  _id: number;
  price: string;
  travel_type: string;
  arrival_location: string;
  zoneName: string;
  travel_image: File | null;
  travel_distance: string;
  travel_detail: string;
  tickets: Array<FormValues>;
}

export default function Page() {
  const [price, setPrice] = useState("");
  const [travel_type, setTravel_type] = useState("");
  const [arrival_location, setArrival_location] = useState("");
  const [ticket, setTickets] = useState<FormValues[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessageTicket, setSuccessMessageTicket] = useState("");
  const [travel_distance, setTravel_distance] = useState("");
  const [travel_detail, setTravel_detail] = useState("");
  const [selectedZone, setSelectedZone] = useState<{
    id: number;
    zoneName: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/zoning/withProvinces`);
      const data = await response.json();
      setTickets(data.zoningCategories);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAddTicket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(selectedZone);
    if (
      !travel_type.trim() ||
      !price.trim() ||
      !arrival_location.trim() ||
      !selectedFile ||
      !travel_distance.trim() ||
      !travel_detail.trim() ||
      !selectedZone?.id
    ) {
      alert("Та бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("travel_type", travel_type);
      formData.append("price", price);
      formData.append("arrival_location", arrival_location);
      formData.append("travel_image", selectedFile);
      formData.append("travel_distance", travel_distance);
      formData.append("travel_detail", travel_detail);

      const response = await fetch(
        `${BASE_URL}/tickets/create/${selectedZone.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add ticket");
      }

      setArrival_location("");
      setPrice("");
      setTravel_type("");
      setTravel_distance("");
      setTravel_detail("");
      setSelectedFile(null);
      setSelectedZone(null);

      setSuccessMessageTicket("Амжилттай нэмэгдлээ!");
      setTimeout(() => setSuccessMessageTicket(""), 2000);
      fetchTickets();
    } catch (err) {
      console.error("Error adding ticket:", err);
    }
  };

  return (
    <div>
      {successMessageTicket && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 flex gap-2">
          {successMessageTicket}
        </div>
      )}

      <div className="w-[1100px] bg-white p-4 rounded-xl mt-[20px] ml-[30px]">
        <h1 className="text-center text-[22px] pt-[20px]">
          Тасалбарын мэдээлэл оруулах
        </h1>
        <form className="p-[20px]">
          <div className="flex flex-col gap-4 items-start justify-center">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="travel_type">
                    Аялалын төрөлөө оруулна уу
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[400px]">
                        {travel_type || "Аялалын төрөл сонгох"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-74 bg-white">
                      <div className="flex flex-col items-center gap-4">
                        {travel_typeData.map((el) => (
                          <div
                            key={el.id}
                            onClick={() => setTravel_type(el.name)}
                            className="cursor-pointer hover:underline"
                          >
                            {el.name}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Байршил оруулах</Label>
                  <Input
                    className="w-[400px]"
                    value={arrival_location}
                    placeholder="Аялалын байршил"
                    onChange={(e) => setArrival_location(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Тасалбарын үнэ</Label>
                  <Input
                    className="w-[400px]"
                    value={price}
                    placeholder="Аялалын үнэ"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label>Аялалын зай</Label>
                  <Input
                    className="w-[400px]"
                    value={travel_distance}
                    placeholder="Аялалын зай"
                    onChange={(e) => setTravel_distance(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Аялалын дэлгэрэнгүй</Label>
                  <Input
                    className="w-[400px]"
                    value={travel_detail}
                    placeholder="Аялалын дэлгэрэнгүй"
                    onChange={(e) => setTravel_detail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Зураг оруулах</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-[400px]"
                  />
                </div>
              </div>

              {/* Zone Selection */}
              <div className="flex flex-col gap-1">
                <Label>Бүсчлэлээ сонгоно уу</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px]">
                      {selectedZone?.zoneName || "Бүсчлэл сонгох"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-54 bg-white">
                    <div className="flex flex-col items-center gap-4">
                      {ticket.map((el) => (
                        <div
                          key={el._id}
                          onClick={() =>
                            setSelectedZone({
                              id: el._id,
                              zoneName: el.zoneName,
                            })
                          }
                          className="cursor-pointer hover:underline"
                        >
                          {el.zoneName}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              type="button"
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
            <h1>Аялалын зай</h1>
            <h1>Тайлбар</h1>
          </div>

          {ticket.map((el) => (
            <div key={el._id}>
              {el.tickets?.map((item, i) => (
                <div key={i} className="flex border-t-2 p-2 justify-around">
                  <div className="w-[100px]">{item.travel_type}</div>
                  <div className="w-[100px]">{item.price}</div>
                  <div className="w-[100px]">{item.arrival_location}</div>
                  <div className="w-[100px]">{item.travel_distance}</div>
                  <div className="w-[200px]">{item.travel_detail}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
